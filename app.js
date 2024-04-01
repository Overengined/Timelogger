var db;
var request = indexedDB.open("MyTestDatabase");

request.onerror = function (event) {
  alert("Pourquoi ne permettez-vous pas à ma web app d'utiliser IndexedDB?!");
};
request.onsuccess = function (event) {
  db = event.target.result;
};

var request = window.indexedDB.open("MyTestDatabase", 3);

request.onerror = function (event) {
  alert("Cannot acess IndexDB db")
};
request.onsuccess = function (event) {
  console.log("succesfully acessed database")
};

db.onerror = (event) => {
  // Generic error handler for all errors targeted at this database's
  // requests!
  console.error(`Database error: ${event.target.errorCode}`);
};

request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for this database
  const objectStore = db.createObjectStore("worktimes", { keyPath: "date" });

  objectStore.createIndex("date", "date", { unique: true });
  objectStore.createIndex("time", "time", { unique: false });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const customerObjectStore = db
      .transaction("wortimes", "readwrite")
      .objectStore("wortimes");
    customerData.forEach((date) => {
      customerObjectStore.add(time);
    });
  }; 
};