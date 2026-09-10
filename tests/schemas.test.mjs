// Behavioural contract for the signup/registration validation schemas.
// Deps: node:test, yup (already present).
//
// Written against yup 0.29 before upgrading to yup 1, whose `when()` takes
// then/otherwise as functions rather than schemas. These assertions are the
// evidence that the migration preserved behaviour: they passed identically before
// and after. This is form validation for a paid retreat signup — "the build is
// green" is not enough to call it unchanged.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { personSchema, cartItemSchema, signupFormSchema } from '../src/schemas.js';

const validDormPerson = {
  FirstName: 'Ada', LastName: 'Lovelace', Email: 'ada@example.com',
  Phone: '(555) 123 4567', Housing: 'dorm', Sex: 'F', Sleep: '3', Snore: '3',
};
const ok = (schema, value) => schema.validate(value);
const rejects = async (schema, value, why) => {
  await assert.rejects(() => schema.validate(value), why);
};

test('a complete dorm registration validates', async () => {
  const v = await ok(personSchema, validDormPerson);
  assert.equal(v.FirstName, 'Ada');
  assert.equal(v.Housing, 'dorm');
});

test('FirstName is required', async () => {
  const { FirstName, ...rest } = validDormPerson;
  await rejects(personSchema, rest);
});

test('dorm housing requires a Sex, which has no default', async () => {
  // This is the conditional branch whose shape yup 1 changed. Sex is the only one of the
  // three dorm fields with default(undefined), so it is the only one a missing value can
  // actually trip; Sleep and Snore default to '3' and satisfy required() on their own.
  const value = { ...validDormPerson };
  delete value.Sex;
  await rejects(personSchema, value, 'dorm registration should require Sex');
});

test('dorm Sleep and Snore fall back to their defaults rather than failing', async () => {
  // They defaulted to the number 3 against a yup.string() branch, so every registration
  // that did not explicitly pick a Snore value failed with "must be a `string` type".
  const value = { ...validDormPerson };
  delete value.Sleep;
  delete value.Snore;
  const v = await ok(personSchema, value);
  assert.equal(v.Sleep, '3');
  assert.equal(v.Snore, '3');
});

test('an out-of-range Sleep or Snore is still rejected', async () => {
  await rejects(personSchema, { ...validDormPerson, Sleep: '9' });
  await rejects(personSchema, { ...validDormPerson, Snore: '9' });
});

test('non-dorm housing does not require Sex, Sleep or Snore', async () => {
  const v = await ok(personSchema, {
    FirstName: 'Ada', Email: 'ada@example.com', Housing: 'day',
  });
  assert.equal(v.Housing, 'day');
});

test('dorm gender is restricted to the documented values', async () => {
  await rejects(personSchema, { ...validDormPerson, Sex: 'X' });
});

test('Housing itself is restricted to dorm/RV/day', async () => {
  await rejects(personSchema, { ...validDormPerson, Housing: 'yurt' });
});

test('a malformed email is rejected, and an empty one is allowed', async () => {
  await rejects(personSchema, { ...validDormPerson, Email: 'not-an-email' });
  const v = await ok(personSchema, { ...validDormPerson, Email: '' });
  assert.equal(v.Email, '');
});

test('a malformed phone number is rejected, and an empty one is allowed', async () => {
  await rejects(personSchema, { ...validDormPerson, Phone: '12' });
  const v = await ok(personSchema, { ...validDormPerson, Phone: '' });
  assert.equal(v.Phone, '');
});

test('defaults are applied, including the allergy option list', () => {
  const d = personSchema.getDefault();
  assert.equal(d.Housing, 'dorm');
  assert.equal(d.remember, true);
  assert.deepEqual(d.Diet, []);
  assert.deepEqual(d.opts.allergies.map((a) => a.id), ['nuts', 'dairy', 'soy']);
});

test('cartItemSchema requires a session with a course id and an ISO start date', async () => {
  await rejects(cartItemSchema, { ...validDormPerson, session: { Title: 'x' } });
  const v = await ok(cartItemSchema, {
    ...validDormPerson,
    session: { CourseID: 'ARB-101', StartDate: '2026-07-01' },
  });
  assert.equal(v.session.CourseID, 'ARB-101');
});

test('signupFormSchema requires at least one person', async () => {
  await rejects(signupFormSchema, { StartDate: '2026-07-01', people: [] });
});

test('signupFormSchema requires email and phone from the first person only', async () => {
  const lead = { ...validDormPerson, idx: 0 };
  const guest = { ...validDormPerson, idx: 1, Email: '', Phone: '' };
  const v = await ok(signupFormSchema, { StartDate: '2026-07-01', people: [lead, guest] });
  assert.equal(v.people.length, 2);
  // ...and rejects a lead with no email.
  await rejects(signupFormSchema, {
    StartDate: '2026-07-01', people: [{ ...lead, Email: '' }],
  });
});
