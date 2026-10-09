// Destino principal de respuestas en una planilla de Google (Apps Script).
// Recibe los votos del sitio y los guarda en una hoja por formulario.
var CAMPOS = {
  'donde-si': ['proceso', 'dato', 'resultado'],
  'por-que-no': ['razones', 'nota']
};

var COLUMNA_ID = 'id';

function limpiar(v) {
  v = String(v || '').slice(0, 300);
  // evita que la planilla interprete el texto como fórmula
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = e.parameter || {};
    var nombre = CAMPOS[p['form-name']] ? p['form-name'] : 'otros';
    var campos = CAMPOS[nombre] || ['proceso', 'dato', 'resultado', 'razones', 'nota'];
    var id = limpiar(p.id).slice(0, 80);
    if (p['campo-extra']) return ContentService.createTextOutput('ok');
    var cache = CacheService.getScriptCache();
    var clave = id && nombre !== 'otros' ? 'voto:' + nombre + ':' + id : '';
    if (clave && cache.get(clave)) return ContentService.createTextOutput('ok');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
    if (hoja.getLastRow() === 0) hoja.appendRow(['fecha'].concat(campos).concat([COLUMNA_ID]));
    else if (hoja.getRange(1, hoja.getLastColumn()).getValue() !== COLUMNA_ID) hoja.getRange(1, hoja.getLastColumn() + 1).setValue(COLUMNA_ID);
    hoja.appendRow([new Date()].concat(campos.map(function (c) { return limpiar(p[c]); })).concat([id]));
    if (clave) cache.put(clave, '1', 21600); // seis horas: cubre reintentos durante el encuentro
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return ContentService.createTextOutput('Respaldo activo'); }
