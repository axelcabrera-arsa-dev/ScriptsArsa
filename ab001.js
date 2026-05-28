/*
let estado=datosAdicionales.resultado_analisis;
const fecha=moment().toDate();

if (estado=== "APROBADO"){
	datosAdicionales._cambiar("fecha_emision_dictamen",fecha);
        datosAdicionales._cambiar("fecha_emision_resolucion",fecha);    
	datosAdicionales._cambiar("fundamentacion_conforme", " Acuerdo No. 0632-ARSA-2023 del Reglamento para el control sanitario de alimentos y bebidas.");
        datosAdicionales._cambiar("estado_solicitudlegal", "CON LUGAR");
        datosAdicionales._cambiar("est_res_leg", "FAVORABLE");
        datosAdicionales._cambiar("cumplimiento_permiso","CUMPLIR");                
        datosAdicionales._habilitarEditor("observacion_legal", true);

if (estado=== "REQUIERE SUBSANACIÓN")
	{
	  datosAdicionales._cambiar("fecha_requerimiento",fecha);
	  datosAdicionales._habilitarEditor("observacion_legal", false);
	  datosAdicionales._habilitarEditor("requerimiento_subsanacion", true);
	}
*/

let estado = (datosAdicionales.resultado_analisis || "").trim().toUpperCase();
let texto,obs_tec,obs_leg;

const fechainicio = moment().toDate();
let vigencia = new Date(fechainicio);
const fecha = moment().toDate();
let establecimiento = datosAdicionales.tipo_establecimiento_1;
let clasificacion = datosAdicionales.tipo_clasificacion;
let categoria = datosAdicionales.tipo_categoria;
let nombrelegal = datosAdicionales.nombre_legal;
let nombretitular = datosAdicionales.nombre_titular;
let direccion = datosAdicionales.direccion_establecimiento;
let observacion = datosAdicionales.observaciones_informe;
let direccion_est =datosAdicionales.dir_establ_tec;
let autorizado= datosAdicionales.lic_autorizado;
let addrs_establ = datosAdicionales.direccion_establecimiento;

let actuante = datosAdicionales.calidad_actuante;
let titular =datosAdicionales.nombre_titular;


let departamento= datosAdicionales.departamento_establecimiento;
let municipio= datosAdicionales.ciudad_establecimiento;
let txt_dir;

let autorizacion, auto_printec,auto_otrtec;
auto_printec=datosAdicionales.aut_para;
auto_otrtec=datosAdicionales.otro_aut;

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let solicitante=tramite.solicitante;
let nombre=solicitante["nombre_completo"];
let tramite_num = tramite.codigo_codificador;
let nombre_tramite=tramite.titulo_tramite;

let dia = vigencia.getDate().toString().padStart(2, '0');
let mes = vigencia.getMonth();  
let anio = vigencia.getFullYear();
let mes_txt=meses[mes];
let msj;

let fecha_pro = datosAdicionales.fecha_prorroga;
let nombre_emp= datosAdicionales.nombre_titular;

debugger;

if(observacion){
observacion=htmlToTextPreservingStructure(observacion);
}



if(autorizado===null){

autorizacion = resolverAutorizacion(auto_printec, auto_otrtec);

function resolverAutorizacion(auto_printec, auto_otrtec) {
  // Si viene como string tipo JSON ? lo convierto en array
  if (typeof auto_printec === "string") {
    try {
      auto_printec = JSON.parse(auto_printec);
    } catch (e) {
      auto_printec = [auto_printec]; // si no es JSON válido, lo meto en array
    }
  }

  const toArray = v => Array.isArray(v) ? v : (v ? [v] : []);
  const cleanStr = v => (typeof v === "string" ? v.trim() : (v ? String(v).trim() : ""));

  const printec = toArray(auto_printec).map(cleanStr).filter(Boolean);
  const otr = cleanStr(auto_otrtec);

  if (printec.length === 0 && otr) return otr;
  if (printec.length > 0 && !otr) return printec.join(", ");
  if (printec.length > 0 && otr)  return [...printec, otr].join(", ");
  return "()";
}

    autorizado=autorizacion ;
	datosAdicionales._cambiar("lic_autorizado", autorizacion );
}

if(direccion_est ===null){
       direccion = datosAdicionales.direccion_establecimiento;
       if (municipio===null)
{municipio=" ";}

 if (departamento===null)
{departamento=" ";}

	txt_dir=addrs_establ.toUpperCase() +", "+municipio.toUpperCase()+", "+departamento.toUpperCase()+".";
        direccion_est =txt_dir;
	datosAdicionales._cambiar("dir_establ_tec",txt_dir);
}

debugger;

if (actuante==="A nombre propio"){
   obs_leg="en su condición de persona natural actuando "+ actuante+ "; con dirección en " +direccion_est + "; autorizado para "+autorizado ;
   datosAdicionales._cambiar("sol_obsleg",obs_leg);
}else if (actuante==="Representante Legal" || actuante==="Apoderado Legal"){
	obs_leg="en su condición de "+actuante+" de la sociedad mercantil "+ titular + "; con dirección en " +direccion_est + "; autorizado para "+autorizado ;
	datosAdicionales._cambiar("sol_obsleg",obs_leg);
}


if(nombrelegal){
     texto= "Establecimiento de interés Sanitario denominado: "+nombrelegal.toUpperCase();
} else{
     texto= "Establecimiento de interés Sanitario denominado: "+"()";
}
if(clasificacion){
     texto=texto+"; con Tipo de clasificación: "+ clasificacion.toUpperCase();
}else{
     texto=texto+"; con Tipo de clasificación: "+ "()";
}
if(categoria){
     texto=texto+"; Tipo de categoría: "+ categoria.toUpperCase();
}else{
     texto=texto+"; Tipo de categoría: "+ "()";
}
if(nombretitular){
    texto=texto+"; cuyo Titular: "+ nombretitular.toUpperCase();
}else{
    texto=texto+"; cuyo Titular: "+ "() ";
}
datosAdicionales._cambiar("sol_tipo_txt", texto);
let dia_hoy =moment().toDate();
debugger;

if (estado === "APROBADO") {

    datosAdicionales._cambiar('vigencia_fecha1', dia_hoy);
    datosAdicionales._cambiar("fecha_emision_dictamen", fecha);
    datosAdicionales._cambiar("fecha_emision_resolucion", fecha);
    // datosAdicionales._cambiar("sol_nombr", nombretitular.toUpperCase());
    datosAdicionales._cambiar("fundamentacion_conforme", "Acuerdo No. 0632-ARSA-2023 del Reglamento para el control sanitario de alimentos y bebidas. ");
    // datosAdicionales._cambiar("hasta", vigencia);
    datosAdicionales._cambiar("sol_tipo_txt", texto);
    datosAdicionales._cambiar("estado_solicitudlegal", "CON LUGAR");
    datosAdicionales._cambiar("est_res_leg", "FAVORABLE");
    datosAdicionales._cambiar("cumplimiento_permiso","CUMPLIR");
    obs_tec="con los requisitos técnico legales.";
    datosAdicionales._cambiar("sol_obstec",obs_tec);
    datosAdicionales._habilitarEditor("fundamentacion_conforme", true);
    datosAdicionales._habilitarEditor("requerimiento_subsanacion", false);
}
else if (estado === "NO CONFORME") {
     datosAdicionales._cambiar('vigencia_fecha1', fecha);
    datosAdicionales._cambiar("fecha_emision_dictamen", fecha);
datosAdicionales._cambiar("fecha_emision_resolucion", fecha);
    datosAdicionales._cambiar("fundamentacion_conforme", " NO CUMPLE CON LAS NORMATIVAS TÉCNICO LEGALES.....");
    datosAdicionales._cambiar("estado_solicitudlegal", "SIN LUGAR");
    datosAdicionales._cambiar("est_res_leg", "NO FAVORABLE");
    datosAdicionales._cambiar("cumplimiento_permiso","NO CUMPLIR");
     //observacion  = htmlToTextPreservingStructure(observacion);
    obs_tec=" en virtud de "+observacion;
    datosAdicionales._cambiar("sol_obstec",obs_tec);
    datosAdicionales._habilitarEditor("fundamentacion_conforme", true);
    datosAdicionales._habilitarEditor("requerimiento_subsanacion", true);
    
}
else if (estado === "CADUCADO") {
    datosAdicionales._cambiar("caducar", fecha);
    datosAdicionales._cambiar("fundamentacion_conforme", " ");
    datosAdicionales._habilitarEditor("fundamentacion_conforme", false);
   // datosAdicionales._habilitarEditor("requerimiento_subsanacion", false);

let fec_req= datosAdicionales.fecha_requerimiento;
let req_date = new Date(fec_req);
    
let diareq = req_date.getDate().toString().padStart(2, '0');
let mesreq = req_date.getMonth(); 
let anioreq = req_date.getFullYear();
let mes_txtreq=meses[mes];

msj="AGENCIA DE REGULACIÓN SANITARIA (ARSA) Comayagüela, Municipio del Distrito Central, departamento de Francisco Morazán a los a los "+ dia+" días, del mes de "+mes_txt+", del año "+anio+" \n \n .DECLÁRESE CADUCADO en derecho y perdido irrevocablemente el plazo legal concedido al ciudadano: "+nombre+", quien actúa en su condición de APODERADO LEGAL de la sociedad Mercantil "+nombre_emp+" en la solicitud de "+nombre_tramite+", de fecha "+diareq+" de "+mes_txtreq+" del año "+anioreq+"; en consecuencia, archívense las diligencias sin más trámite, teniendo expeditas las acciones que en derecho correspondan, FUNDAMENTOS DE DERECHO: Artículo 80 de la Constitución de la República Artículos 43, 49 80, de la Ley de Procedimiento Administrativo, Decreto Legislativo No. 7- 2021 de la Ley de la Agencia de Regulación Sanitaria que ratifica el Decreto Ejecutivo PCM-032-2017 y su reforma Decreto Ejecutivo PCM-013-2020; Artículo 38 inciso 6, 76, 77, 78, 81, 101, Reglamento sobre Gobierno Electrónico.- NOTIFIQUESE.";

datosAdicionales._cambiar("providencia_caducidad", msj);
}
else if (estado === "REQUIERE SUBSANACIÓN") {
    datosAdicionales._cambiar("fecha_requerimiento", fecha);
    datosAdicionales._cambiar("fundamentacion_conforme", " ");
    datosAdicionales._habilitarEditor("fundamentacion_conforme", false);
    //datosAdicionales._habilitarEditor("requerimiento_subsanacion", true);
msj="AGENCIA DE REGULACIÓN SANITARIA (ARSA) Comayagüela, Municipio del Distrito Central, departamento de Francisco Morazán a los a los "+ dia+", días del mes de "+mes_txt+", del año "+anio+";PREVIO A RESOLVER la solicitud que antecede, presentada por:"+nombre+", quien actúa en su condición de APODERADO LEGAL de la Empresa/Sociedad Mercantil denominada: "+nombre_emp+" en la que solicita "+nombre_tramite+" -El peticionario deberá presentar: "+observacion+"En consecuencia, REQUIÉRASE en legal y debida forma al solicitante concediéndole el plazo diez (10) días hábiles contados a partir del día siguiente de la notificación, para que proceda a presentar la documentación antes requerida DE FORMA ELECTRÓNICA, con el apercibimiento que, si no lo hiciere en el plazo establecido se archivarán las diligencias sin más trámite.- FUNDAMENTOS DE DERECHOS: Artículo 80 de la Constitución De La República; Artículo 116, 121, 122, de la Ley General De La Administración Pública; Artículo, 49, 54, 55, 56, 57, 60, 61, 62, 63, 64, 80, 87 REFORMADO, 88 REFORMADO Y 90 de la Ley De Procedimiento Administrativo; Decreto Legislativo NO. 7- 2021 de La Ley De La Agencia De Regulación Sanitaria que ratifica el Decreto Ejecutivo PCM-032-2017 y su reforma Decreto Ejecutivo PCM-013-2020; Artículo 38 inciso 6, 76, 77, 78, 81, 101, Reglamento Sobre Gobierno Electrónico. - NOTIFÍQUESE";
datosAdicionales._cambiar("prov_requerimiento1", msj);
}

function htmlToTextPreservingStructure(html) {
  const container = document.createElement('div');
  container.innerHTML = html;

  function walk(node) {
    let text = '';

    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.nodeValue;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();

        switch (tag) {
          case 'br':
            text += '\n';
            break;
          case 'p':
            text += walk(child) + '\n\n';
            break;
          case 'li':
            text += '- ' + walk(child) + '\n';
            break;
          case 'ol':
          case 'ul':
            text += walk(child) + '\n';
            break;
          case 'a':
            text += walk(child); // Solo texto del link, no URL
            break;
          default:
            text += walk(child);
        }
      }
    });

    return text;
  }

  let plainText = walk(container);

  // Limpia espacios dobles y líneas en blanco innecesarias
  return plainText
    .replace(/\u00A0/g, ' ')       // reemplaza &nbsp; por espacio real
    .replace(/[ \t]+/g, ' ')       // colapsa espacios múltiples
    .replace(/\n{3,}/g, '\n\n')    // máximo 2 saltos seguidos
    .trim();
}


