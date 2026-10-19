import type { Person } from '../components/patterns';
import { boardOfDirectors, seniorManagement } from './leadership';
import { generalInsurance, lifeAssurance, microinsurance } from './companies';

export type LeaderGroup = {company: string;people: Person[];};
export type LeadershipView = {
  slug: 'board-of-directors' | 'executive-team';
  label: string;
  intro: string;
  groups: LeaderGroup[];
};

const normalise = (name: string) =>
name.replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, '').replace(/\s+[A-Z]\.\s+/, ' ').trim().toLowerCase();

// Group leaders carry photos and bios; reuse them when the same person sits on a subsidiary board.
const known = new Map([...boardOfDirectors, ...seniorManagement].map((p) => [normalise(p.name), p]));

export const enrich = (people: Person[]): Person[] =>
people.map((p) => {
  const match = known.get(normalise(p.name));
  return match ? { ...p, name: match.name, photo: match.photo, bio: match.bio } : p;
});

const companyPeople = (people: Person[], group: string) => enrich(people.filter((p) => p.group === group)).map(({ group: _g, ...p }) => p);

export const leadershipViews: LeadershipView[] = [
{
  slug: 'board-of-directors',
  label: 'Board of Directors',
  intro: 'Our boards set the direction for CIC Group and each of our businesses, and hold us to our promise to keep our word.',
  groups: [
  { company: 'CIC Insurance Group PLC', people: boardOfDirectors },
  { company: 'CIC Life Assurance Limited', people: companyPeople(lifeAssurance.people, 'Board of Directors') },
  { company: 'CIC General Insurance Limited', people: companyPeople(generalInsurance.people, 'Board of Directors') },
  { company: 'CIC Microinsurance Limited', people: companyPeople(microinsurance.people, 'Board of Directors') }]

},
{
  slug: 'executive-team',
  label: 'Executive team',
  intro: 'The people who run our businesses day to day, in Kenya and across the region.',
  groups: [
  { company: 'CIC Insurance Group PLC', people: seniorManagement },
  { company: 'CIC Life Assurance Limited', people: companyPeople(lifeAssurance.people, 'Management') },
  { company: 'CIC General Insurance Limited', people: companyPeople(generalInsurance.people, 'Management') },
  { company: 'CIC Microinsurance Limited', people: companyPeople(microinsurance.people, 'Management') }]

}];
