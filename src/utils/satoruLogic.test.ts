import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EVENT_RESULTS,
  PARTNER_COMMUNITIES,
} from '../data/satoruData';
import {
  buildJoinMessage,
  extractTikTokHandle,
  filterEvents,
  filterPartners,
  formatDedicationNames,
  formatFollowerCount,
  normalizeRoute,
  validateJoinForm,
} from './satoruLogic';

test('normalizeRoute maps all Satoru Community paths cleanly', () => {
  assert.equal(normalizeRoute('/'), 'main-page');
  assert.equal(normalizeRoute('/main-page'), 'main-page');
  assert.equal(normalizeRoute('/partnership'), 'partnership');
  assert.equal(normalizeRoute('/division'), 'division');
  assert.equal(normalizeRoute('/awards'), 'awards');
  assert.equal(normalizeRoute('/hall-of-fame'), 'hall-of-fame');
  assert.equal(normalizeRoute('/admins'), 'admins');
  assert.equal(normalizeRoute('/join-satoru-now'), 'join-satoru-now');
  assert.equal(normalizeRoute('/unknown-route'), 'main-page');
});

test('extractTikTokHandle and formatFollowerCount handle valid and pending winners', () => {
  assert.equal(extractTikTokHandle('@hh3en_'), 'hh3en_');
  assert.equal(extractTikTokHandle('@Oxygen.Preset'), 'oxygen.preset');
  assert.equal(extractTikTokHandle('@NOT YET'), null);
  assert.equal(extractTikTokHandle(''), null);

  assert.equal(formatFollowerCount(2320), '2.3K followers');
  assert.equal(formatFollowerCount(860), '860 followers');
  assert.equal(formatFollowerCount(1500000), '1.5M followers');
  assert.equal(formatFollowerCount(null), '');
});

test('filterEvents returns expected counts by category and search query', () => {
  assert.equal(filterEvents(EVENT_RESULTS, 'all', '').length, 38);
  assert.equal(filterEvents(EVENT_RESULTS, 'mep', '').length, 15);
  assert.equal(filterEvents(EVENT_RESULTS, 'collab-jj', '').length, 12);
  assert.equal(filterEvents(EVENT_RESULTS, 'other-collabs', '').length, 11);

  const ramadhan = filterEvents(EVENT_RESULTS, 'all', 'ramadhan');
  assert.equal(ramadhan.length, 1);
  assert.equal(ramadhan[0].title, 'Satoru Ramadhan 0.1');
});

test('filterPartners preserves 1-based numbering across searches', () => {
  const all = filterPartners(PARTNER_COMMUNITIES, '');
  assert.equal(all.length, PARTNER_COMMUNITIES.length);
  assert.equal(all[0].index, 1);
  assert.equal(all[0].name, 'Never Evolution Three');

  const codestra = filterPartners(PARTNER_COMMUNITIES, 'codestra');
  assert.equal(codestra.length, 1);
  assert.equal(codestra[0].name, 'Codestra Unit');
  assert.equal(codestra[0].index, 13);
});

test('formatDedicationNames formats all three Satoru name patterns', () => {
  const formatted = formatDedicationNames('Keano');
  assert.equal(formatted.kanji, 'Keano悟');
  assert.equal(formatted.star, 'Keano-✧');
  assert.equal(formatted.dotStr, 'Keano.str');

  const fallback = formatDedicationNames('   ');
  assert.equal(fallback.kanji, 'Name悟');
});

test('validateJoinForm rejects missing required fields and formats valid payload', () => {
  const invalid = validateJoinForm({
    tiktokUsername: '',
    tiktokUrl: 'invalid-url',
    whatsappNumber: '123',
    software: '',
    editingStyle: '',
    timeline: '',
    followedOfficial: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.tiktokUsername);
  assert.ok(invalid.errors.tiktokUrl);
  assert.ok(invalid.errors.whatsappNumber);
  assert.ok(invalid.errors.software);
  assert.ok(invalid.errors.timeline);
  assert.ok(invalid.errors.followedOfficial);

  const validInput = {
    tiktokUsername: 'keanopreset',
    tiktokUrl: 'https://www.tiktok.com/@keanopreset',
    whatsappNumber: '081234567890',
    software: 'Alight Motion',
    editingStyle: 'Jedag-Jedug',
    timeline: '3 Jam 20 Menit',
    followedOfficial: true,
  };
  const validResult = validateJoinForm(validInput);
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});

  const msg = buildJoinMessage(validInput);
  assert.match(msg, /@keanopreset/);
  assert.match(msg, /Alight Motion \(Jedag-Jedug\)/);
  assert.match(msg, /3 Jam 20 Menit/);
});
