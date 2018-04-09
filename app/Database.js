import RxDB, { QueryChangeDetector } from 'rxdb';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http')); //enable syncing over http

const collections = [
  {
    name: 'sales',
    schema: require('./Schema.js').default,
    sync: true,
  },
];

const syncURL = 'http://' + window.location.hostname + ':10102/';
// const syncURL = `http://${window.location.hostname}:10102/`;
console.log(`host:${syncURL}`);
// const syncURL = host;

let dbPromise = null;

const create = async function () {
  console.log('DatabaseService: creating database..');
  // RxDB.removeDatabase('sales', 'idb');
  const db = await RxDB.create({ name: 'sales', adapter: 'idb', password: 'myLongAndStupidPassword' });
  console.log('DatabaseService: created database');
  window['db'] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log('isLeader now');
    document.title = `♛ ${document.title}`;
  });

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map((colData) => db.collection(colData)));

  // hooks
  // console.log('DatabaseService: add hooks');
  // db.collections.heroes.preInsert((docObj) => {
  //   const color = docObj.color;
  //   return db.collections.heroes.findOne({ color }).exec().then((has) => {
  //     if (has != null) {
  //       alert(`another hero already has the color ${color}`);
  //       throw new Error('color already there');
  //     }
  //     return db;
  //   });
  // });

  // sync
  console.log('DatabaseService: sync');
  collections.filter((col) => col.sync).map((col) => col.name).map((colName) => db[colName].sync({
    remote: `${syncURL}${colName}/`,
  }));

  return db;
};

export function get() {
  if (!dbPromise) {
    dbPromise = create();
  }
  return dbPromise;
}
