export interface Event {
  id: string;
  date: Date;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  location: string;
  category: 'course' | 'cultural' | 'trip' | 'social';
  time: string;
  capacity?: number;
  registered?: number;
  link?: string;
}

export const events: Event[] = [
  {
    id: 'tečaj-1',
    date: new Date('2026-01-18'),
    title: 'Tečaj njemačkog - Početnici',
    titleDe: 'Deutschkurs - Anfänger',
    description: 'Osnovna nastava njemačkog jezika za početnike. Naučite osnove gramatike, vokabulara i izgovora.',
    descriptionDe: 'Grundunterricht Deutsch für Anfänger. Lernen Sie die Grundlagen der Grammatik, des Wortschatzes und der Aussprache.',
    location: 'Split - Centar',
    category: 'course',
    time: '19:00 - 21:00',
    capacity: 20,
    registered: 12,
  },
  {
    id: 'kulturni-1',
    date: new Date('2026-01-25'),
    title: 'Kulturni sekvencijal - Izložba hrvatskih umetnika',
    titleDe: 'Kulturveranstaltung - Ausstellung kroatischer Künstler',
    description: 'Otvorimo prostor za prikaz radova lokalnih hrvatskih umetnika sa fotografijom i skulpturama.',
    descriptionDe: 'Wir präsentieren Werke lokaler kroatischer Künstler mit Fotografie und Skulpturen.',
    location: 'Makarska - Galerija',
    category: 'cultural',
    time: '18:00',
    capacity: 100,
    registered: 45,
  },
  {
    id: 'izlet-berlin',
    date: new Date('2026-02-15'),
    title: 'Izlet u Berlin - Kulturna tura kroz povijest',
    titleDe: 'Ausflug nach Berlin - Kulturelle Tour durch die Geschichte',
    description: 'Trogodišnja tura kroz Berlin sa posjeta Deutschem Historischem Museum, Brandenburškim kapijom i mnogim drugim istorijskim mjestima.',
    descriptionDe: 'Dreitägige Tour durch Berlin mit Besuchen im Deutschen Historischen Museum, dem Brandenburger Tor und vielen anderen historischen Orten.',
    location: 'Berlin',
    category: 'trip',
    time: 'Cijeli dan',
    capacity: 30,
    registered: 18,
  },
  {
    id: 'tečaj-2',
    date: new Date('2026-02-01'),
    title: 'Tečaj njemačkog - Srednja razina',
    titleDe: 'Deutschkurs - Mittelstufe',
    description: 'Nastavite sa naprednom gramatikom, razgovorom i pismenim vještinama.',
    descriptionDe: 'Fortgeschrittene Grammatik, Konversation und Schreibfähigkeiten.',
    location: 'Split - Centar',
    category: 'course',
    time: '19:00 - 21:00',
    capacity: 20,
    registered: 15,
  },
  {
    id: 'drustveni-1',
    date: new Date('2026-01-30'),
    title: 'Društveni susret - Nečerav se upoznaj',
    titleDe: 'Gesellschaftliches Treffen - Networking-Event',
    description: 'Neformalni susret gdje se članovi mogu upoznati i umrežiti sa kolegama.',
    descriptionDe: 'Informelles Treffen, bei dem sich Mitglieder kennenlernen und vernetzen können.',
    location: 'Split - Kavana Tvrđava',
    category: 'social',
    time: '20:00 - 23:00',
    capacity: 50,
    registered: 28,
  },
  {
    id: 'kulturni-2',
    date: new Date('2026-03-07'),
    title: 'Koncert - Njemačka klasična glazba',
    titleDe: 'Konzert - Deutsche klassische Musik',
    description: 'Uživajte u izvedbi klasične njemačke glazbe sa lokalnim orkestrom.',
    descriptionDe: 'Genießen Sie die Aufführung klassischer deutscher Musik mit dem lokalen Orchester.',
    location: 'Split - Narodno kazalište',
    category: 'cultural',
    time: '19:30',
    capacity: 300,
    registered: 120,
  },
];

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = events
    .filter(e => e.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getEventsByMonth(year: number, month: number): Event[] {
  return events.filter(e => {
    return e.date.getFullYear() === year && e.date.getMonth() === month;
  });
}

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}
