/**
 * SALAM TRANSFERS - Core Controller & Translation System
 * Multi-page localization support (ES, EN, FR, AR) and interactive UI logic.
 */

// --- Centralized Pricing & Routes Configuration ---
const PRICING_CONFIG = {
  currency: 'MXN',
  routes: {
    'cancun-hz': {
      name: {
        es: 'Aeropuerto Cancún ↔ Cancún (Zona Hotelera y centro)',
        en: 'Cancún Airport ↔ Cancún (Hotel Zone & Downtown)',
        fr: 'Aéroport de Cancún ↔ Cancún (Zone Hôtelière & Centre)',
        ar: 'مطار كانكون ↔ كانكون (المنطقة الفندقية والوسط)'
      },
      price6: 800,
      price11: 1400,
      deposit: 300
    },
    'puerto-morelos': {
      name: {
        es: 'Aeropuerto Cancún ↔ Puerto Morelos, Costa Mujeres y Akumal',
        en: 'Cancún Airport ↔ Puerto Morelos, Costa Mujeres & Akumal',
        fr: 'Aéroport de Cancún ↔ Puerto Morelos, Costa Mujeres & Akumal',
        ar: 'مطار كانكون ↔ بويرتو موريلوس، كوستا موخيريس وأكومال'
      },
      price6: 1100,
      price11: 1800,
      deposit: 400
    },
    'playa-del-carmen': {
      name: {
        es: 'Aeropuerto Cancún ↔ Playa del Carmen',
        en: 'Cancún Airport ↔ Playa del Carmen',
        fr: 'Aéroport de Cancún ↔ Playa del Carmen',
        ar: 'مطار كانكون ↔ بلايا ديل كارمن'
      },
      price6: 1500,
      price11: 2400,
      deposit: 500
    },
    'akumal-aventuras': {
      name: {
        es: 'Aeropuerto Cancún ↔ Puerto Aventuras y Bahía Príncipe',
        en: 'Cancún Airport ↔ Puerto Aventuras & Bahía Príncipe',
        fr: 'Aéroport de Cancún ↔ Puerto Aventuras & Bahía Príncipe',
        ar: 'مطار كانكون ↔ بويرتو أفينتوراس وباهيا برينسيبي'
      },
      price6: 1800,
      price11: 2900,
      deposit: 600
    },
    'tulum': {
      name: {
        es: 'Aeropuerto Cancún ↔ Tulum',
        en: 'Cancún Airport ↔ Tulum',
        fr: 'Aéroport de Cancún ↔ Tulum',
        ar: 'مطار كانكون ↔ تولوم'
      },
      price6: 2200,
      price11: 3500,
      deposit: 700
    }
  },
  chauffeur: {
    pricePerHour: 450, // Minimum 4 hours
    minHours: 4,
    depositPercent: 0.30
  },
  mosque: {
    fixedPrice: 600, // Round trip from hotel zones
    deposit: 200
  },
  event: {
    fixedPrice: 5000, // Premium base
    deposit: 1500
  }
};

// --- Language Localization Dictionaries ---
const TRANSLATIONS = {
  es: {
    // Navigation
    nav_home: "Inicio",
    nav_services: "Servicios",
    nav_routes: "Rutas y Precios",
    nav_muslim: "Muslim-Friendly",
    nav_how: "Cómo funciona",
    nav_faq: "FAQ",
    nav_booking: "Reservar",
    nav_contact: "Contacto",
    
    // Global Elements
    footer_summary: "Transportación privada premium en Cancún y la Riviera Maya. Brindamos confianza, puntualidad y un servicio respetuoso adaptado a familias internacionales y viajeros musulmanes.",
    footer_links_title: "Servicios",
    footer_info_title: "Información",
    footer_legal_title: "Legal",
    footer_rights: "© 2026 Salam Transfers. Todos los derechos reservados.",
    whatsapp_text: "Hola Salam Transfers, tengo una pregunta o una solicitud especial con respecto a mi próximo viaje a la Riviera Maya. ¿Podría ayudarme un agente? ¡Gracias!",
    legal_terms: "Términos del Servicio",
    legal_privacy: "Política de Privacidad",
    legal_cancellation: "Política de Cancelación",
    
    // Terms Page
    terms_title: "Términos del Servicio",
    terms_last_updated: "Última actualización: 22 de mayo de 2026",
    terms_h1: "1. Aceptación de los Términos",
    terms_p1: "Al acceder y reservar servicios de transporte privado con Salam Transfers, usted acepta estar legalmente obligado por estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestros servicios.",
    terms_h2: "2. Reservas y Depósitos",
    terms_p2: "Se requiere un depósito en línea seguro para confirmar todas las reservaciones. Este depósito asegura el vehículo asignado y el bloque del conductor. El saldo restante debe pagarse directamente al conductor al llegar a su destino. Los precios se cotizan en Pesos Mexicanos (MXN) pero pueden liquidarse en Dólares Estadounidenses (USD) o Euros (EUR) según el tipo de cambio bancario autorizado a la fecha del traslado.",
    terms_h3: "3. Comportamiento del Pasajero",
    terms_p3: "Para mantener nuestro estándar de servicio premium y un ambiente respetuoso con los valores culturales y musulmanes (Muslim-friendly), está estrictamente prohibido el consumo de bebidas alcohólicas, fumar de cualquier tipo (incluidos cigarrillos electrónicos y vapes) y comportamientos agresivos o irrespetuosos en los vehículos. El chofer se reserva el derecho de rechazar el servicio a cualquier pasajero que viole estas condiciones, sin elegibilidad para un reembolso.",
    terms_h4: "4. Retrasos de Vuelos y Monitoreo en Tiempo Real",
    terms_p4: "Monitoreamos activamente los vuelos comerciales en tiempo real. No hay cargos adicionales por retrasos de vuelos. El conductor lo esperará en función de la hora real de aterrizaje de su vuelo. Sin embargo, si un vuelo se cancela o si cambia de número de vuelo, debe notificar a Salam Transfers lo antes posible para coordinar la reasignación de su conductor.",
    terms_h5: "5. Limitación de Responsabilidad",
    terms_p5: "Salam Transfers no se hace responsable de llegadas tardías debido a bloqueos de carreteras, conflictos civiles, condiciones climáticas extremas o demoras en la aduana del aeropuerto. Recomendamos a los pasajeros planificar sus salidas con tiempo suficiente para los trámites del aeropuerto internacional (mínimo 3 horas antes de su vuelo de salida).",

    // Privacy Page
    privacy_title: "Política de Privacidad",
    privacy_h1: "1. Información que Recopilamos",
    privacy_p1: "Recopilamos la información personal necesaria para organizar y realizar sus solicitudes de transporte privado, incluyendo: Nombre Completo, Dirección de Correo Electrónico, Número de Teléfono/WhatsApp, Números de Vuelo, Fechas y Lugares de recogida y destino. No almacenamos los datos completos de su tarjeta de crédito; todas las transacciones financieras se procesan de forma segura directamente a través de nuestra pasarela de pagos, Stripe.",
    privacy_h2: "2. Cómo Utilizamos su Información",
    privacy_p2: "Sus datos se utilizan estrictamente para coordinar sus traslados privados, comunicar detalles de llegada de su chofer, enviar recibos de depósito y gestionar actualizaciones de cortesía por retrasos de vuelos. No vendemos, alquilamos ni cedemos su información personal a terceros.",
    privacy_h3: "3. Retención y Protección de Datos",
    privacy_p3: "Implementamos arquitecturas de bases de datos seguras y certificados SSL de encriptación para proteger sus datos personales contra el acceso no autorizado. Conservamos los registros de viaje únicamente durante el tempo necesario para el cumplimiento administrativo, el soporte al cliente y la contabilidad financiera.",
    privacy_h4: "4. Sus Derechos",
    privacy_p4: "Usted tiene derecho a solicitar el acceso, rectificación o eliminación de sus datos personales almacenados en nuestros sistemas. Puede ejercer estos derechos en cualquier momento poniéndose en contacto con nuestro equipo de soporte por correo electrónico a privacy@salamtransfers.com.",

    // Cancellation Page
    cancel_title: "Política de Cancelación y Cambios",
    cancel_h1: "1. Reglas de Cancelación",
    cancel_p1: "Las reservaciones pueden ser canceladas en cualquier momento notificando a nuestro centro de soporte por correo electrónico o WhatsApp. Tenga en cuenta que el depósito pagado en línea durante la reserva no es reembolsable bajo ninguna circunstancia. Esta cantidad sirve para asegurar su conductor y la disponibilidad del vehículo, protegiendo nuestra programación operativa.",
    cancel_h2: "2. Modificaciones Gratuitas y Cambios de Fecha",
    cancel_p2: "Permitimos cambios ilimitados de fecha, hora y ruta del vehículo sin cargo alguno hasta 24 horas antes del servicio programado. Si la nueva ruta incurre en una tarifa más alta, el cliente debe pagar la diferencia al llegar. Si la nueva ruta es menos costosa, el saldo pendiente a pagar al conductor se reducirá en consecuencia.",
    cancel_h3: "3. Retrasos y Cancelaciones de Vuelos",
    cancel_p3: "Salam Transfers realiza un seguimiento de todos los vuelos entrantes. Si su vuelo se retrasa, el tiempo de espera del conductor es de cortesía, independientemente de la duración. En caso de cancelación del vuelo por parte de la aerolínea, su depósito se conservará como un cupón de crédito, válido para su uso en cualquier reserva futura dentro de los 365 días naturales.",
    cancel_h4: "4. No Presentación (No-Show)",
    cancel_p4: "Si un cliente no llega al área de reunión designada dentro de los 90 minutos posteriores al aterrizaje oficial del vuelo, y no se ha comunicado con nuestro centro de soporte, el servicio se clasificará como 'No-Show' (No Presentación). En este caso, la reserva se cancela y el depósito se pierde por completo.",
    
    // Shared CTAs
    btn_book_now: "Reservar ahora",
    btn_whatsapp: "WhatsApp Directo",
    btn_contact: "Contáctanos",
    btn_next: "Siguiente",
    btn_back: "Atrás",
    btn_confirm: "Confirmar y Pagar",
    
    // Home Page
    hero_title: "Transportación Privada en Cancún, Playa del Carmen y Tulum",
    hero_subtitle: "Traslados de aeropuerto, chofer privado por día y transporte dedicado a mezquitas. Un servicio premium, respetuoso y de absoluta confianza.",
    
    why_title: "¿Por qué Salam Transfers?",
    why_subtitle_small: "Un servicio en el que puedes confiar.",
    why_trust_title: "Confianza Cultural",
    why_trust_desc: "Vehículos 100% libres de alcohol, conductores respetuosos y conocimiento de horarios y mezquitas locales para Salat.",
    why_private_title: "Privado & Premium",
    why_private_desc: "Sin esperas ni paradas compartidas. Traslados directos en camionetas modernas con aire acondicionado y puertos USB.",
    why_support_title: "Soporte Bilingüe",
    why_support_desc: "Asistencia las 24 horas en inglés, español y árabe para coordinar perfectamente su llegada.",
    
    how_it_works_title: "Cómo funciona el servicio",
    step1_title: "Formulario de Viaje",
    step1_desc: "Completa el formulario con los datos de tu viaje.",
    step2_title: "Cotización al Instante",
    step2_desc: "Revisa tu cotización al instante en pantalla.",
    step3_title: "Anticipo Seguro",
    step3_desc: "Confirma tu reserva con un anticipo pagado en línea.",
    step4_title: "Confirmación Inmediata",
    step4_desc: "Recibe confirmación por email y WhatsApp, con los datos de tu chofer.",
    step5_title: "Contacto del Chofer",
    step5_desc: "Tu chofer te contacta el día anterior para coordinar el punto de encuentro.",
    step6_title: "Viaje & Pago",
    step6_desc: "Disfruta tu viaje y paga el saldo directamente al chofer en efectivo, tarjeta o transferencia.",
    how_additional_transport_notice: "Si necesitas transportación adicional durante tu visita — tours, paseos, transportación a la mezquita o regreso al aeropuerto — contáctanos por WhatsApp y te asignaremos el chofer disponible. Reservar a través de Salam Transfers te garantiza atención bilingüe 24/7, factura formal si la requieres, y respaldo en caso de cualquier imprevisto.",

    audience_title: "Un servicio diseñado para ti",
    audience_families: "Familias Internacionales",
    audience_families_desc: "Vehículos amplios de 6 y 11 pasajeros con espacio generoso para equipaje y sillas para bebés bajo solicitud previa.",
    audience_muslim: "Viajeros Musulmanes",
    audience_muslim_desc: "Conductores que comprenden el respeto al Salat, conocen las mezquitas locales en Quintana Roo y cuidan la paz del trayecto.",
    audience_vip: "Clientes Ejecutivos y Bodas",
    audience_vip_desc: "Puntualidad rigurosa, vehículos discretos y choferes profesionales para eventos, bodas y traslados corporativos.",

    // Services Page
    services_title: "Nuestros Servicios",
    serv_airport: "Traslados de Aeropuerto",
    serv_airport_desc: "Servicio de ida o ida y vuelta desde el Aeropuerto de Cancún a cualquier hotel, resort o residencia en la Riviera Maya.",
    serv_driver: "Chofer Privado por Día",
    serv_driver_desc: "Disfruta de la Riviera Maya a tu propio ritmo con una camioneta y un conductor profesional a tu entera disposición.",
    serv_mosque: "Transportación a Mezquitas",
    serv_mosque_desc: "Conexiones seguras y puntuales hacia la Mezquita Al-Rahim en Cancún y la Mezquita Al-Rahman en Playa del Carmen.",
    serv_events: "Eventos & Bodas",
    serv_events_desc: "Transportación para bodas, llegadas de invitados, eventos islámicos, conferencias y ocasiones especiales.",
    capacity_6: "Hasta 6 pasajeros",
    capacity_11: "Hasta 11 pasajeros",
    inclusions_title: "Estándar de Comodidad Incluido",
    inc_flight: "Monitoreo de Vuelo",
    inc_sign: "Letrero de Bienvenida",
    inc_charger: "Cargador USB",
    inc_water: "Agua de Cortesía",
    inc_wifi: "WiFi Portátil",

    // Routes Page
    routes_title: "Rutas y Tarifas Transparentes",
    routes_subtitle: "Tarifas fijas en pesos mexicanos (MXN). Sin tarifas sorpresa en el aeropuerto. Reserva con un depósito y paga el resto al llegar.",
    table_route: "Ruta / Destino",
    table_cap6: "Camioneta Familiar (1-6 Pax)",
    table_cap11: "Camioneta Ejecutiva (7-11 Pax)",
    table_deposit: "Depósito Requerido",
    table_action: "Reservar Ruta",
    
    col_destino: "Destino",
    col_hasta6: "Hasta 6 personas",
    col_reserva6: "Reserva con",
    col_hasta11: "Hasta 11 personas",
    col_reserva11: "Reserva con",
    
    title_table1: "Origen Aeropuerto Cancún",
    title_table2: "Origen Cancún Centro / Zona Hotelera",
    title_table3: "Origen Playa del Carmen",
    title_table4: "Origen Tulum Centro",
    title_table5: "Tours desde Cancún Centro / Zona Hotelera",
    title_table6: "Tours desde Playa del Carmen",
    title_table7: "Tours desde Tulum",

    note_mxn: "Todas las tarifas en pesos mexicanos (MXN).",
    note_type: "Tarifas para viaje sencillo en traslados; viaje redondo con espera incluida en tours.",
    note_tolls: "Algunos destinos no incluyen peajes; se aclara en la tabla y se cobra directamente al chofer.",
    note_inquiries: "Consulta tarifas para destinos no listados (parques, cenotes, pueblos mágicos, mezquita y eventos).",

    place_cancun_hz: "Cancún Centro / Zona Hotelera",
    place_costa_mujeres: "Costa Mujeres",
    place_puerto_morelos: "Puerto Morelos",
    place_playa_paraiso: "Playa Paraíso",
    place_playa_del_carmen: "Playa del Carmen",
    place_puerto_aventuras: "Puerto Aventuras",
    place_bahia_principe: "Bahía Príncipe",
    place_tulum_centro: "Tulum Centro",
    place_tulum_hz: "Tulum Zona Hotelera",
    place_cancun_centro: "Cancún Centro",
    place_aeropuerto: "Aeropuerto",
    place_royalton: "Royalton",
    place_playa_local: "Playa del Carmen (local)",
    place_xcaret: "Xcaret",
    place_cancun_hz_short: "Cancún Zona Hotelera / Centro",
    place_tulum: "Tulum",
    place_coba: "Cobá",
    place_chichen_peaje: "Chichén Itzá (peaje incluido)",
    place_holbox_no_peaje: "Holbox (peaje no incluido)",
    place_cancun: "Cancún",
    place_chichen_no_peaje: "Chichén Itzá (peaje no incluido)",
    place_chichen: "Chichén Itzá",

    // Muslim Friendly Page
    muslim_title: "Servicios Muslim-Friendly Certificados por la Confianza",
    muslim_p1: "En Salam Transfers, nos enorgullece ser el único servicio de transporte en el Caribe Mexicano especializado en atender con profundo respeto a la comunidad musulmana internacional.",
    muslim_benefit_title: "Detalles que marcan la diferencia",
    muslim_salat_title: "Soporte para Salat (Oración)",
    muslim_salat_desc: "Nuestros conductores están capacitados con los horarios de oración del día y conocen áreas seguras y limpias para detenerse a orar en carretera. Ofrecemos alfombras de oración limpias en el vehículo bajo solicitud.",
    muslim_env_title: "Ambiente Puro y Familiar",
    muslim_env_desc: "Garantizamos vehículos 100% libres de alcohol, cigarrillos y olores desagradables. Un entorno pacífico ideal para su familia.",
    muslim_mosques_title: "Comunidad Islámica Local",
    muslim_mosques_desc: "Te llevamos con comodidad a los centros de oración de la región:",
    mosque_cancun: "Mezquita Al-Rahim (Cancún) - El primer espacio islámico en Quintana Roo, un hermoso punto de encuentro de la comunidad local.",
    mosque_playa: "Mezquita Al-Rahman (Playa del Carmen) - Ubicada convenientemente cerca del centro para tus oraciones diarias.",

    // FAQ Page
    faq_title: "Preguntas Frecuentes",
    faq_subtitle: "Todo lo que necesitas saber sobre tu transportación en el Caribe Mexicano.",

    // Contact Page
    contact_title: "Contacto Directo",
    contact_subtitle: "Estamos aquí para responder tus preguntas y coordinar tus traslados las 24 horas.",
    contact_form_title: "Envíanos un Mensaje",
    contact_name: "Nombre Completo",
    contact_email: "Correo Electrónico",
    contact_phone: "Número de Teléfono",
    contact_message: "Mensaje / Solicitud Especial",
    contact_send: "Enviar Mensaje",
    contact_info_title: "Información de contacto",
    contact_hours_title: "Horario de atención",
    contact_social_title: "Síguenos",
    contact_phone_label: "Teléfono y WhatsApp",
    contact_email_label: "Email",
    contact_web_label: "Web",
    contact_loc_label: "Ubicación",
    contact_hours_desc: "Reservas en línea 24/7. Respuesta por WhatsApp en horario extendido (6:00 - 23:00 hora local).",

    // Booking Wizard Page
    book_title: "Reserva Tu Traslado Premium",
    book_step1: "1. Datos de Viaje",
    book_step2: "2. Cotización",
    book_step3: "3. Pago de Depósito",
    book_step4: "4. Confirmación",
    
    lbl_service_type: "Tipo de Servicio",
    opt_airport: "Traslado de Aeropuerto",
    opt_chauffeur: "Chofer por Día",
    opt_mosque: "Transportación a Mezquita",
    opt_events: "Eventos y Bodas",
    
    lbl_vehicle_type: "Tipo de Vehículo",
    veh_sienna_title: "Hasta 6 personas",
    veh_sienna_desc: "Para familias pequeñas y equipaje regular.",
    veh_hiace_title: "Hasta 11 personas",
    veh_hiace_desc: "Para grupos, familias grandes o equipaje extra.",
    veh_included_label: "Incluido en todos los traslados:",
    veh_included_desc: "monitoreo de vuelo, cartel con tu nombre, cargador USB y espera de cortesía si tu vuelo se retrasa.",
    
    lbl_route: "Selecciona tu Ruta",
    opt_route_cancun: "Aeropuerto Cancún ↔ Cancún (Zona Hotelera y centro)",
    opt_route_playa: "Aeropuerto Cancún ↔ Playa del Carmen",
    opt_route_tulum: "Aeropuerto Cancún ↔ Tulum",
    opt_route_puerto: "Aeropuerto Cancún ↔ Puerto Morelos, Costa Mujeres y Akumal",
    opt_route_aventuras: "Aeropuerto Cancún ↔ Puerto Aventuras y Bahía Príncipe",
    lbl_pickup_loc: "Punto de Partida (Origen)",
    lbl_dropoff_loc: "Destino Final",
    lbl_flight_num: "Número de Vuelo y Aerolínea",
    lbl_passengers: "Número de Pasajeros",
    lbl_luggage: "Cantidad de Maletas Grandes",
    lbl_hours: "Horas Requeridas (Mínimo 4)",
    lbl_mosque_select: "Selecciona la Mezquita",
    
    quote_summary: "Resumen de tu Cotización",
    quote_total: "Precio Total del Servicio",
    quote_deposit: "Depósito para Confirmar (Pago en línea)",
    quote_balance: "Saldo a Pagar al Conductor (En destino)",
    
    pay_title: "Pago Seguro con Stripe",
    pay_card: "Número de Tarjeta",
    pay_holder: "Nombre del Titular",
    pay_card_expiry: "MM/AA",
    pay_cvv: "CVV",
    pay_secure: "Pago encriptado con seguridad SSL de 256 bits",
    
    success_title: "¡Reservación Confirmada!",
    success_subtitle: "Tu traslado ha sido programado. Se ha enviado un correo con tu recibo de depósito.",
    success_num_label: "Número de Reservación",
    success_driver_title: "Tu Conductor Asignado (Placeholder)",
    success_driver_name: "Nombre del Chofer",
    success_driver_car: "Vehículo",
    success_driver_plate: "Placas",
    success_whatsapp_cta: "Enviar confirmación por WhatsApp",
    success_delay_courtesy: "Monitoreo activado: Si tu vuelo se retrasa, te esperamos gratis.",
    
    // Custom FAQs
    faq_bottom_text: "¿Tienes alguna otra duda que no aparezca en esta sección?",
    faq_q1: "¿Los traslados son privados o compartidos?",
    faq_a1: "Todos nuestros traslados son privados. No compartes vehículo con otros pasajeros — solo con tu familia o tu grupo.",
    faq_q2: "¿Atienden solo a clientes musulmanes?",
    faq_a2: "No. Salam Transfers está abierto a cualquier viajero que prefiera un ambiente respetuoso y tranquilo.",
    faq_q3: "¿Pueden llevarme a la mezquita el viernes?",
    faq_a3: "Sí. Ofrecemos transportación dedicada a las mezquitas Masjid Al-Rahim (Cancún) y Masjid Al-Rahman (Playa del Carmen), con servicio de espera durante la oración.",
    faq_q4: "¿Cómo funciona el pago?",
    faq_a4: "Confirmas tu reserva con un anticipo pagado en línea. El saldo restante se paga directamente al chofer el día del servicio en efectivo, tarjeta o transferencia.",
    faq_q5: "¿El anticipo es reembolsable?",
    faq_a5: "No. El anticipo asegura tu reservación y no se reembolsa. Sin embargo, puedes cambiar fecha u hora sin costo con al menos 24 horas de anticipación, sujeto a disponibilidad.",
    faq_q6: "¿Ofrecen servicio por día completo para tours?",
    faq_a6: "Sí. Ofrecemos chofer privado por horas, medio día o día completo para tours, parques, cenotes, shopping o cualquier itinerario que elijas.",
    faq_q7: "¿Pueden coordinar transportación para una boda o evento?",
    faq_a7: "Sí. Coordinamos transportación para bodas de destino, eventos islámicos y conferencias. Solicita una cotización personalizada.",
    faq_q8: "¿Qué pasa si mi vuelo se retrasa?",
    faq_a8: "Monitoreamos tu vuelo en tiempo real y ajustamos el horario de recogida sin costo adicional dentro de un margen razonable.",
    faq_q9: "¿Tienen sillas para niños?",
    faq_a9: "Sí, bajo solicitud previa. Indícalo al reservar y confirmaremos disponibilidad.",
    faq_q10: "¿Hablan inglés, francés o árabe?",
    faq_a10: "Nuestro equipo atiende reservas en español e inglés. Para servicios en francés o árabe, escrébenos con anticipación y coordinaremos.",
    faq_q11: "¿Cómo puedo pagar el saldo al chofer?",
    faq_a11: "Aceptamos efectivo (MXN o USD), tarjeta de crédito/débito o transferencia bancaria.",
    faq_q12: "¿Necesito reservar con anticipación?",
    faq_a12: "Recomendamos reservar con al menos 24 horas de anticipación para garantizar disponibilidad, especialmente en temporada alta.",
    faq_q13: "¿Las tarifas incluyen peajes?",
    faq_a13: "Algunos destinos sí, otros no. Está claramente indicado en la tabla de precios. Los peajes no incluidos se pagan directamente al chofer durante el viaje.",
    serv_airport_p: "Ofrecemos un servicio directo y exclusivo para tu grupo familiar. Nuestro conductor te estará esperando en el punto de encuentro del aeropuerto para asistirte con el equipaje y comenzar tu estancia de la manera más cómoda y sin retrasos.",
    serv_driver_p: "Ideal para visitas a zonas arqueológicas como Tulum, Chichén Itzá o Cobá, parques temáticos como Xcaret, cenotes recónditos o zonas comerciales. Olvídate de coordinar múltiples taxis y viaja seguro con un chofer que conoce a la perfección las mejores rutas de la región.",
    serv_mosque_p: "Para tu tranquilidad espiritual y comodidad durante tus vacaciones, organizamos traslados de ida y vuelta para la oración de los viernes (Jummah) o las oraciones diarias. Coordinamos la recogida en tu hotel para asegurar tu llegada oportuna y el regreso seguro de tu familia.",
    serv_events_p: "Ofrecemos soluciones integrales de logística de transporte para grupos pequeños y grandes. Nos aseguramos de trasladar a tus invitados de manera puntual, segura y con los más altos estándares de comodidad, proporcionando apoyo de coordinación directa las 24 horas.",
    muslim_p2: "Nuestra misión es hacer que tu estancia en Cancún y la Riviera Maya sea completamente placentera y libre de preocupaciones, permitiéndote disfrutar de las bellezas del Caribe Mexicano sin comprometer tus valores y prácticas espirituales diarias.",
    muslim_salat_note: "Simplemente indícale a tu conductor cuando sea el momento de la oración y él con gusto coordinará una parada adecuada en una mezquita cercana o un sitio tranquilo y limpio a lo largo del trayecto.",
    muslim_env_note: "Creemos firmemente en el respeto al cliente. Nuestras camionetas son rigurosamente sanitizadas después de cada servicio, manteniendo un ambiente limpio, neutro y cómodo para ti y tus hijos.",
    mosque_cancun_title: "Mezquita Al-Rahim (Cancún)",
    mosque_playa_title: "Mezquita Al-Rahman (Playa del Carmen)",
    step1_note: "El proceso es 100% en línea y toma menos de 2 minutos.",
    step2_note: "Precios fijos y transparentes en MXN, sin cargos ocultos ni tarifas sorpresa.",
    step3_note: "Procesado de forma segura a través de Stripe con encriptación SSL de 256 bits.",
    step4_note: "Te enviamos tu código de reserva único y los detalles del vehículo asignado.",
    step5_note: "Para tu tranquilidad, coordinamos directamente vía WhatsApp o llamada antes de tu llegada.",
    step6_note: "Disfruta tu viaje y paga el saldo directamente al chofer en efectivo, tarjeta o transferencia.",
    policy_deposit_title: "Depósito de Reserva",
    policy_deposit_desc: "Para garantizar la reservación y bloquear la unidad con su chofer asignado, se cobra un depósito parcial en línea. <strong>Este depósito no es reembolsable</strong> si el cliente cancela unilateralmente el servicio.",
    policy_changes_title: "Cambios de Fecha Gratuitos",
    policy_changes_desc: "Entendemos que los planes de viaje pueden cambiar. Permitimos realizar modificaciones en fechas y horarios de traslado sin penalizaciones <strong>hasta 24 horas antes</strong> de la hora programada del servicio.",
    policy_delay_title: "Cortesía por Retraso",
    policy_delay_desc: "Si tu vuelo se retrasa, no te preocupes. Monitoreamos tu estatus de vuelo de manera constante. Tu chofer <strong>te esperará de manera gratuita</strong> el tiempo que sea necesario a partir de tu aterrizaje real."
  },
  en: {
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_routes: "Routes & Prices",
    nav_muslim: "Muslim-Friendly",
    nav_how: "How It Works",
    nav_faq: "FAQ",
    nav_booking: "Book Now",
    nav_contact: "Contact",
    
    // Global Elements
    footer_summary: "Premium private transportation in Cancún and the Riviera Maya. We provide trust, punctuality, and respectful service tailored for international families and Muslim travelers.",
    footer_links_title: "Services",
    footer_info_title: "Information",
    footer_legal_title: "Legal",
    footer_rights: "© 2026 Salam Transfers. All rights reserved.",
    whatsapp_text: "Hello Salam Transfers, I have a question or a special request regarding my upcoming trip to the Riviera Maya. Could an agent please assist me? Thank you!",
    legal_terms: "Terms of Service",
    legal_privacy: "Privacy Policy",
    legal_cancellation: "Cancellation Policy",

    // Terms Page
    terms_title: "Terms of Service",
    terms_last_updated: "Last Updated: May 22, 2026",
    terms_h1: "1. Acceptance of Terms",
    terms_p1: "By accessing and booking transportation services with Salam Transfers, you agree to be legally bound by these Terms of Service. If you do not agree to any of these terms, please do not use our services.",
    terms_h2: "2. Booking and Deposit",
    terms_p2: "A secure online deposit is required to confirm all reservations. This deposit reserves the assigned vehicle and driver block. The remaining balance must be paid directly to the driver upon arrival at your destination. Prices are quoted in Mexican Pesos (MXN) but may be settled in US Dollars (USD) or Euros (EUR) based on bank-authorized exchange rates at the date of transit.",
    terms_h3: "3. Passenger Behavior",
    terms_p3: "To maintain our premium service standard and Muslim-friendly environment, the consumption of alcoholic beverages, smoking of any kind (including electronic cigarettes/vapes), and aggressive or disrespectful behavior in the vehicles is strictly prohibited. The driver reserves the right to refuse service to any passenger who violates these conditions, without eligibility for a refund.",
    terms_h4: "4. Flight Delays and Real-Time Tracking",
    terms_p4: "We actively monitor commercial airline flights. There are no surcharges for delayed flights. The driver will wait for you based on your flight's actual landing time. However, if a flight is canceled or you are rebooked on a different flight number, you must notify Salam Transfers as soon as possible to ensure driver reassignment.",
    terms_h5: "5. Limitation of Liability",
    terms_p5: "Salam Transfers is not liable for delayed arrivals due to highway blockages, civil disputes, extreme weather conditions, or customs delays. We recommend passengers plan their departures with sufficient time for international airport check-ins (minimum 3 hours prior to departure).",

    // Privacy Page
    privacy_title: "Privacy Policy",
    privacy_h1: "1. Information We Collect",
    privacy_p1: "We collect personal information necessary to organize and fulfill your private transport requests, including: Full Name, Email Address, Telephone/WhatsApp Number, Flight Numbers, Dates, and Pick-up/Drop-off locations. We do not store full credit card data; all financial transactions are securely processed directly by our payment gateway, Stripe.",
    privacy_h2: "2. How We Use Your Information",
    privacy_p2: "Your details are strictly used to coordinate your private transfers, communicate arrival details, send deposit invoices, and manage flight delayed courtesy updates. We do not sell, rent, or lease your personal information to third parties.",
    privacy_h3: "3. Data Retention and Protection",
    privacy_p3: "We implement secure database architectures and SSL certificates to protect your personal details against unauthorized access. We retain travel records only as long as necessary for administrative compliance, customer support, and financial bookkeeping.",
    privacy_h4: "4. Your Rights",
    privacy_p4: "You have the right to request access, rectification, or erasure of your personal data stored in our booking systems. You may exercise these rights at any time by contacting our support team via email at privacy@salamtransfers.com.",

    // Cancellation Page
    cancel_title: "Cancellation & Changes Policy",
    cancel_h1: "1. Cancellation Rules",
    cancel_p1: "Reservations may be canceled at any time by notifying our support desk via email or WhatsApp. Please note that the online deposit paid during booking is strictly non-refundable. This amount serves to secure your driver block and vehicle availability, protecting our operational schedules.",
    cancel_h2: "2. Free Modifications and Date Changes",
    cancel_p2: "We permit unlimited date, time, and vehicle route changes free of charge up to 24 hours prior to the scheduled service time. If the new route incurs a higher rate, the customer must settle the difference at arrival. If the new route is less expensive, the remaining balance due to the driver will be reduced accordingly.",
    cancel_h3: "3. Flight Delays and Cancellations",
    cancel_p3: "Salam Transfers tracks all incoming flights. If your flight is delayed, driver waiting time is complimentary, regardless of the duration. In the event of a flight cancellation by the airline, your deposit will be preserved as a credit voucher, valid for use towards any future reservation within 365 calendar days.",
    cancel_h4: "4. No-Shows",
    cancel_p4: "If a customer does not arrive at the designated meeting area within 90 minutes after the flight has officially landed, and has not communicated with our support desk, the service will be classified as a 'No-Show'. In this instance, the reservation is canceled and the deposit is forfeited.",
    
    // Shared CTAs
    btn_book_now: "Book Now",
    btn_whatsapp: "Direct WhatsApp",
    btn_contact: "Contact Us",
    btn_next: "Next",
    btn_back: "Back",
    btn_confirm: "Confirm & Pay Deposit",
    
    // Home Page
    hero_title: "Private Transportation in Cancún, Playa del Carmen & Tulum",
    hero_subtitle: "Airport transfers, daily private chauffeur, and dedicated mosque transportation. A premium, respectful, and highly reliable service.",
    
    why_title: "Why Salam Transfers?",
    why_subtitle_small: "A service you can trust.",
    why_trust_title: "Cultural Trust",
    why_trust_desc: "100% alcohol-free vehicles, respectful drivers, and extensive knowledge of local prayer times and mosques for Salat.",
    why_private_title: "Private & Premium",
    why_private_desc: "No waiting lines or shared shuttle stops. Direct transfers in modern, air-conditioned vans with USB chargers.",
    why_support_title: "Bilingual Support",
    why_support_desc: "24/7 assistance in English, Spanish, and Arabic to coordinate your arrival perfectly.",
    
    how_it_works_title: "How It Works",
    step1_title: "Travel Details Form",
    step1_desc: "Complete the form with your travel details.",
    step2_title: "Instant Quote",
    step2_desc: "Review your quote instantly on the screen.",
    step3_title: "Secure Deposit",
    step3_desc: "Confirm your reservation with a secure deposit paid online.",
    step4_title: "Immediate Confirmation",
    step4_desc: "Receive confirmation via email and WhatsApp, with your driver's details.",
    step5_title: "Driver Contact",
    step5_desc: "Your driver contacts you the day before to coordinate the meeting point.",
    step6_title: "Enjoy & Settle",
    step6_desc: "Enjoy your trip and settle the balance directly with the driver via cash, card, or bank transfer.",
    how_additional_transport_notice: "If you need additional transportation during your visit — tours, sightseeing, mosque transfers, or airport return — contact us via WhatsApp and we will assign the available driver. Booking through Salam Transfers guarantees 24/7 bilingual support, a formal invoice if required, and backing in case of any unforeseen circumstances.",

    audience_title: "A Service Tailored For You",
    audience_families: "International Families",
    audience_families_desc: "Spacious 6 and 11 passenger vehicles with ample luggage space and baby car seats available upon request.",
    audience_muslim: "Muslim Travelers",
    audience_muslim_desc: "Drivers who respect prayer times (Salat), know the local mosques in Quintana Roo, and maintain a quiet, clean vehicle environment.",
    audience_vip: "Corporate & Weddings",
    audience_vip_desc: "Rigorous punctuality, sleek discrete vehicles, and professional drivers for weddings, events, and VIP corporate transport.",

    // Services Page
    services_title: "Our Services",
    serv_airport: "Airport Transfers",
    serv_airport_desc: "One-way or round-trip private transport from Cancun Airport to any hotel, resort, or private villa in the Riviera Maya.",
    serv_driver: "Daily Private Chauffeur",
    serv_driver_desc: "Explore the Riviera Maya at your own pace with a modern van and professional driver dedicated entirely to you.",
    serv_mosque: "Mosque Transportation",
    serv_mosque_desc: "Reliable round-trips to Masjid Al-Rahim in Cancun or Masjid Al-Rahman in Playa del Carmen.",
    serv_events: "Events & Weddings",
    serv_events_desc: "Transportation for weddings, guest arrivals, Islamic events, conferences, and special occasions.",
    capacity_6: "Up to 6 passengers",
    capacity_11: "Up to 11 passengers",
    inclusions_title: "Comfort Inclusions Standard",
    inc_flight: "Flight Tracking",
    inc_sign: "Welcome Sign Greeting",
    inc_charger: "Seat USB Chargers",
    inc_water: "Complimentary Water",
    inc_wifi: "Onboard Portable WiFi",

    // Routes Page
    routes_title: "Transparent Routes & Rates",
    routes_subtitle: "Fixed prices in Mexican Pesos (MXN). No hidden airport pickup fees. Secure your ride with a deposit, pay the balance on arrival.",
    table_route: "Route / Destination",
    table_cap6: "Family Van (1-6 Pax)",
    table_cap11: "Executive Van (7-11 Pax)",
    table_deposit: "Required Deposit",
    table_action: "Book Route",
    
    col_destino: "Destination",
    col_hasta6: "Up to 6 passengers",
    col_reserva6: "Reserve with",
    col_hasta11: "Up to 11 passengers",
    col_reserva11: "Reserve with",
    
    title_table1: "Origin Cancun Airport",
    title_table2: "Origin Cancun Downtown / Hotel Zone",
    title_table3: "Origin Playa del Carmen",
    title_table4: "Origin Tulum Downtown",
    title_table5: "Tours from Cancun Downtown / Hotel Zone",
    title_table6: "Tours from Playa del Carmen",
    title_table7: "Tours from Tulum",

    note_mxn: "All rates in Mexican Pesos (MXN).",
    note_type: "One-way rates for transfers; round-trip with waiting time included for tours.",
    note_tolls: "Some destinations do not include tolls; this is specified in the table and paid directly to the driver.",
    note_inquiries: "Inquire about rates for destinations not listed (parks, cenotes, magical towns, mosque and events).",

    place_cancun_hz: "Cancun Downtown / Hotel Zone",
    place_costa_mujeres: "Costa Mujeres",
    place_puerto_morelos: "Puerto Morelos",
    place_playa_paraiso: "Playa Paraiso",
    place_playa_del_carmen: "Playa del Carmen",
    place_puerto_aventuras: "Puerto Aventuras",
    place_bahia_principe: "Bahia Principe",
    place_tulum_centro: "Tulum Downtown",
    place_tulum_hz: "Tulum Hotel Zone",
    place_cancun_centro: "Cancun Downtown",
    place_aeropuerto: "Airport",
    place_royalton: "Royalton",
    place_playa_local: "Playa del Carmen (local)",
    place_xcaret: "Xcaret",
    place_cancun_hz_short: "Cancun Hotel Zone / Downtown",
    place_tulum: "Tulum",
    place_coba: "Coba",
    place_chichen_peaje: "Chichen Itza (toll included)",
    place_holbox_no_peaje: "Holbox (toll not included)",
    place_cancun: "Cancun",
    place_chichen_no_peaje: "Chichen Itza (toll not included)",
    place_chichen: "Chichen Itza",

    // Muslim Friendly Page
    muslim_title: "Pioneering Muslim-Friendly Travel",
    muslim_p1: "At Salam Transfers, we are proud to be the only private transportation service in the Mexican Caribbean specialized in welcoming the international Muslim travel community with deep respect.",
    muslim_benefit_title: "Thoughtful Details",
    muslim_salat_title: "Salat Support (Prayer times)",
    muslim_salat_desc: "Our drivers are fully aware of daily prayer schedules and have mapped clean, quiet locations along the highways for prayer stops. Clean prayer mats are available inside the vehicle upon request.",
    muslim_env_title: "Pristine Family Environment",
    muslim_env_desc: "We guarantee 100% alcohol-free, smoke-free, and odor-free vehicles. A peaceful and respectful environment for your loved ones.",
    muslim_mosques_title: "Local Islamic Community",
    muslim_mosques_desc: "We provide easy, direct transport to the region's main houses of worship:",
    mosque_cancun: "Masjid Al-Rahim (Cancun) - The first masjid in Quintana Roo, a beautiful spiritual space welcoming local and visiting Muslims.",
    mosque_playa: "Masjid Al-Rahman (Playa del Carmen) - Conveniently located near the center for your daily prayers.",

    // FAQ Page
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Everything you need to know about your private transfers in Cancun and Riviera Maya.",

    // Contact Page
    contact_title: "Direct Contact",
    contact_subtitle: "We are available 24/7 to answer your questions and coordinate your private transportation.",
    contact_form_title: "Send Us a Message",
    contact_name: "Full Name",
    contact_email: "Email Address",
    contact_phone: "Phone Number",
    contact_message: "Message / Special Requests",
    contact_send: "Send Message",
    contact_info_title: "Contact Information",
    contact_hours_title: "Opening Hours",
    contact_social_title: "Follow Us",
    contact_phone_label: "Phone & WhatsApp",
    contact_email_label: "Email",
    contact_web_label: "Web",
    contact_loc_label: "Location",
    contact_hours_desc: "Online bookings 24/7. WhatsApp response during extended hours (6:00 AM - 11:00 PM local time).",

    // Booking Wizard Page
    book_title: "Book Your Premium Transfer",
    book_step1: "1. Travel Details",
    book_step2: "2. Quote Summary",
    book_step3: "3. Pay Deposit",
    book_step4: "4. Confirmation",
    
    lbl_service_type: "Service Type",
    opt_airport: "Airport Transfer",
    opt_chauffeur: "Private Chauffeur",
    opt_mosque: "Mosque Transit",
    opt_events: "Events & Weddings",
    
    lbl_vehicle_type: "Vehicle Type",
    veh_sienna_title: "Up to 6 passengers",
    veh_sienna_desc: "For small families and regular luggage.",
    veh_hiace_title: "Up to 11 passengers",
    veh_hiace_desc: "For groups, large families or extra luggage.",
    veh_included_label: "Included in all transfers:",
    veh_included_desc: "flight monitoring, sign with your name, USB charger, and courtesy waiting time if your flight is delayed.",
    
    lbl_route: "Select your Route",
    opt_route_cancun: "Cancún Airport ↔ Cancún (Hotel Zone & Downtown)",
    opt_route_playa: "Cancún Airport ↔ Playa del Carmen",
    opt_route_tulum: "Cancún Airport ↔ Tulum",
    opt_route_puerto: "Cancún Airport ↔ Puerto Morelos, Costa Mujeres & Akumal",
    opt_route_aventuras: "Cancún Airport ↔ Puerto Aventuras & Bahía Príncipe",
    lbl_pickup_loc: "Pickup Location (Origin)",
    lbl_dropoff_loc: "Dropoff Destination",
    lbl_flight_num: "Flight Number & Airline",
    lbl_passengers: "Number of Passengers",
    lbl_luggage: "Large Suitcases",
    lbl_hours: "Hours Required (Min 4)",
    lbl_mosque_select: "Select Mosque",
    
    quote_summary: "Your Quote Summary",
    quote_total: "Total Service Price",
    quote_deposit: "Deposit to Confirm (Pay online now)",
    quote_balance: "Remaining Balance to Driver (At destination)",
    
    pay_title: "Secure Payment via Stripe",
    pay_card: "Card Number",
    pay_holder: "Cardholder Name",
    pay_card_expiry: "MM/YY",
    pay_cvv: "CVV",
    pay_secure: "Encrypted payment protected by 256-bit SSL security",
    
    success_title: "Booking Confirmed!",
    success_subtitle: "Your transfer has been successfully scheduled. A receipt for your deposit has been sent to your email.",
    success_num_label: "Reservation Code",
    success_driver_title: "Your Assigned Driver Details",
    success_driver_name: "Driver Name",
    success_driver_car: "Vehicle Model",
    success_driver_plate: "License Plate",
    success_whatsapp_cta: "Send Confirmation to WhatsApp",
    success_delay_courtesy: "Tracking active: If your flight is delayed, your driver waits free of charge.",
    
    // Custom FAQs
    faq_bottom_text: "Do you have any other questions that are not listed here?",
    faq_q1: "Are the transfers private or shared?",
    faq_a1: "All of our transfers are private. You do not share the vehicle with other passengers — only with your family or your group.",
    faq_q2: "Do you only serve Muslim clients?",
    faq_a2: "No. Salam Transfers is open to any traveler who prefers a respectful and peaceful environment.",
    faq_q3: "Can you take me to the mosque on Friday?",
    faq_a3: "Yes. We offer dedicated transportation to the mosques Masjid Al-Rahim (Cancun) and Masjid Al-Rahman (Playa del Carmen), with waiting service during prayer.",
    faq_q4: "How does payment work?",
    faq_a4: "You confirm your booking with a deposit paid online. The remaining balance is paid directly to the driver on the day of service in cash, card, or bank transfer.",
    faq_q5: "Is the deposit refundable?",
    faq_a5: "No. The deposit secures your reservation and is non-refundable. However, you can change the date or time at no cost with at least 24 hours' notice, subject to availability.",
    faq_q6: "Do you offer full-day service for tours?",
    faq_a6: "Yes. We offer a private driver by the hour, half-day, or full-day for tours, parks, cenotes, shopping, or any itinerary you choose.",
    faq_q7: "Can you coordinate transportation for a wedding or event?",
    faq_a7: "Yes. We coordinate transportation for destination weddings, Islamic events, and conferences. Request a personalized quote.",
    faq_q8: "What happens if my flight is delayed?",
    faq_a8: "We monitor your flight in real time and adjust the pickup time at no additional cost within a reasonable window.",
    faq_q9: "Do you have child seats?",
    faq_a9: "Yes, upon prior request. Please indicate this when booking and we will confirm availability.",
    faq_q10: "Do you speak English, French, or Arabic?",
    faq_a10: "Our team handles reservations in Spanish and English. For services in French or Arabic, please write to us in advance and we will coordinate.",
    faq_q11: "How can I pay the balance to the driver?",
    faq_a11: "We accept cash (MXN or USD), credit/debit card, or bank transfer.",
    faq_q12: "Do I need to book in advance?",
    faq_a12: "We recommend booking at least 24 hours in advance to guarantee availability, especially during peak season.",
    faq_q13: "Do the rates include tolls?",
    faq_a13: "Some destinations do, others do not. This is clearly indicated in the pricing table. Tolls not included are paid directly to the driver during the trip.",
    serv_airport_p: "We offer a direct and exclusive service for your family group. Our driver will be waiting for you at the airport meeting point to assist you with your luggage and start your stay in the most comfortable way without delays.",
    serv_driver_p: "Ideal for visits to archaeological sites such as Tulum, Chichen Itza, or Coba, theme parks like Xcaret, hidden cenotes, or shopping areas. Forget about coordinating multiple taxis and travel safely with a driver who knows the region's best routes perfectly.",
    serv_mosque_p: "For your spiritual peace of mind and comfort during your vacation, we organize round-trip transfers for Friday prayers (Jummah) or daily prayers. We coordinate pickup at your hotel to ensure your timely arrival and the safe return of your family.",
    serv_events_p: "We offer comprehensive transportation logistics solutions for small and large groups. We ensure your guests are transported punctually, safely, and with the highest standards of comfort, providing 24/7 direct coordination support.",
    muslim_p2: "Our mission is to make your stay in Cancun and the Riviera Maya completely pleasant and worry-free, allowing you to enjoy the beauties of the Mexican Caribbean without compromising your daily spiritual values and practices.",
    muslim_salat_note: "Simply let your driver know when it is prayer time, and he will gladly coordinate a suitable stop at a nearby mosque or a quiet, clean spot along the way.",
    muslim_env_note: "We firmly believe in customer respect. Our vans are rigorously sanitized after each service, maintaining a clean, neutral, and comfortable environment for you and your children.",
    mosque_cancun_title: "Masjid Al-Rahim (Cancun)",
    mosque_playa_title: "Masjid Al-Rahman (Playa del Carmen)",
    step1_note: "The process is 100% online and takes less than 2 minutes.",
    step2_note: "Fixed and transparent prices in MXN, no hidden fees or surprise rates.",
    step3_note: "Processed securely through Stripe with 256-bit SSL encryption.",
    step4_note: "We send you your unique reservation code and assigned vehicle details.",
    step5_note: "For your peace of mind, we coordinate directly via WhatsApp or call before your arrival.",
    step6_note: "Enjoy your trip and settle the balance directly with the driver via cash, card, or bank transfer.",
    policy_deposit_title: "Booking Deposit",
    policy_deposit_desc: "To guarantee the reservation and secure the vehicle with its assigned driver, a partial deposit is charged online. <strong>This deposit is non-refundable</strong> if the client cancels the service unilaterally.",
    policy_changes_title: "Free Date Changes",
    policy_changes_desc: "We understand that travel plans can change. We allow modifications to transfer dates and times without penalties <strong>up to 24 hours before</strong> the scheduled service time.",
    policy_delay_title: "Delay Courtesy",
    policy_delay_desc: "If your flight is delayed, don't worry. We monitor your flight status constantly. Your driver <strong>will wait for you free of charge</strong> for as long as necessary after your actual landing."
  },
  fr: {
    // Navigation
    nav_home: "Accueil",
    nav_services: "Services",
    nav_routes: "Tarifs",
    nav_muslim: "Muslim-Friendly",
    nav_how: "Comment ça marche",
    nav_faq: "FAQ",
    nav_booking: "Réserver",
    nav_contact: "Contact",
    
    // Global Elements
    footer_summary: "Transport privé haut de gamme à Cancún et la Riviera Maya. Nous offrons confiance, ponctualité et service respectueux adapté aux familles et voyageurs musulmans.",
    footer_links_title: "Services",
    footer_info_title: "Informations",
    footer_legal_title: "Légal",
    footer_rights: "© 2026 Salam Transfers. Tous droits réservés.",
    whatsapp_text: "Bonjour Salam Transfers, j'ai une question ou une demande spéciale concernant mon prochain voyage sur la Riviera Maya. Un agent pourrait-il m'aider? Merci!",
    legal_terms: "Conditions d'utilisation",
    legal_privacy: "Politique de confidentialité",
    legal_cancellation: "Politique d'annulation",

    // Terms Page
    terms_title: "Conditions d'utilisation",
    terms_last_updated: "Dernière mise à jour: 22 mai 2026",
    terms_h1: "1. Acceptation des Conditions",
    terms_p1: "En accédant et en réservant des services de transport privé avec Salam Transfers, vous acceptez d'être légalement lié par ces conditions d'utilisation. Si vous n'acceptez pas l'une de ces conditions, veuillez ne pas utiliser nos services.",
    terms_h2: "2. Réservation et Acompte",
    terms_p2: "Un acompte en ligne sécurisé est requis pour confirmer toutes les réservations. Cet acompte réserve le véhicule et le créneau du chauffeur. Le solde restant doit être payé directement au chauffeur à l'arrivée. Les prix sont affichés en Pesos Mexicains (MXN) mais peuvent être réglés en Dollars (USD) ou en Euros (EUR) selon le taux de change autorisé à la date du transfert.",
    terms_h3: "3. Comportement des Passagers",
    terms_p3: "Pour maintenir notre standard de service premium et un environnement respectueux (Muslim-friendly), la consommation d'alcool, le tabagisme sous toutes ses formes (y compris les cigarettes électroniques/vapes) et les comportements agressifs ou irrespectueux dans les véhicules sont strictement interdits. Le chauffeur se réserve le droit de refuser le service à tout passager enfreignant ces règles, sans remboursement.",
    terms_h4: "4. Retards de Vols et Suivi en Temps Réel",
    terms_p4: "Nous suivons en temps réel tous les vols commerciaux. Il n'y a pas de frais supplémentaires en cas de retard de vol. Le chauffeur vous attendra à l'heure réelle d'atterrissage. En cas de vol annulé ou de modification de votre numéro de vol, vous devez en informer Salam Transfers au plus vite pour réassigner le chauffeur.",
    terms_h5: "5. Limite de Responsabilité",
    terms_p5: "Salam Transfers n'est pas responsable des arrivées tardives dues aux blocages routiers, conflits civils, conditions climatiques extrêmes ou retards aux douanes de l'aéroport. Nous recommandons de planifier le départ avec suffisamment d'avance pour les vols internationaux (minimum 3 heures avant l'heure du vol).",

    // Privacy Page
    privacy_title: "Politique de confidentialité",
    privacy_h1: "1. Informations Recueillies",
    privacy_p1: "Nous collectons les données personnelles nécessaires à l'organisation de votre transfert : Nom Complet, E-mail, Téléphone/WhatsApp, Numéro de Vol, Date et Lieux de prise en charge et de destination. Nous ne conservons pas les coordonnées bancaires complètes ; toutes les transactions sont traitées de manière sécurisée par notre passerelle Stripe.",
    privacy_h2: "2. Utilisation de vos Données",
    privacy_p2: "Vos coordonnées sont uniquement utilisées pour coordonner votre trajet privé, communiquer les informations d'arrivée, envoyer les reçus d'acompte et gérer les retards. Nous ne vendons, louons ni ne partageons vos données avec des tiers.",
    privacy_h3: "3. Protection et Conservation",
    privacy_p3: "Nous utilisons des bases de données sécurisées et des certificats SSL pour protéger vos données contre tout accès non autorisé. Nous ne conservons les données de voyage que le temps nécessaire aux exigences administratives, support client et comptabilité.",
    privacy_h4: "4. Vos Droits",
    privacy_p4: "Vous disposez d'un droit d'accès, de rectification ou de suppression de vos données personnelles stockées dans nos systèmes. Vous pouvez exercer ce droit à tout moment en contactant privacy@salamtransfers.com.",

    // Cancellation Page
    cancel_title: "Politique d'annulation et modifications",
    cancel_h1: "1. Règles d'annulation",
    cancel_p1: "Les réservations peuvent être annulées à tout moment en contactant notre équipe d'assistance par e-mail ou WhatsApp. Veuillez noter que l'acompte payé en ligne n'est strictement pas remboursable. Ce montant sert à sécuriser la réservation du chauffeur et du véhicule, protégeant ainsi notre organisation.",
    cancel_h2: "2. Modifications et Changements de Date Gratuits",
    cancel_p2: "We permit unlimited date, time, and vehicle route changes free of charge up to 24 hours prior to the scheduled service time. If the new route incurs a higher rate, the customer must settle the difference at arrival. If the new route is less expensive, the remaining balance due to the driver will be reduced accordingly.",
    cancel_h3: "3. Retards et Annulations de Vol",
    cancel_p3: "Salam Transfers suit tous les vols arrivant. Si votre vol est retardé, l'attente du chauffeur est entièrement gratuite, peu importe la durée. En cas d'annulation du vol par la compagnie, votre acompte sera conservé comme crédit pour toute réservation future dans les 365 jours.",
    cancel_h4: "4. Non-Présentation (No-Show)",
    cancel_p4: "Si un client ne se présente pas au point de rencontre 90 minutes après l'atterrissage officiel du vol, sans avoir contacté notre équipe d'assistance, le transfert sera considéré comme 'No-Show'. Dans ce cas, la réservation est annulée et l'acompte est perdu.",
    
    // Shared CTAs
    btn_book_now: "Réserver maintenant",
    btn_whatsapp: "WhatsApp Direct",
    btn_contact: "Contactez-nous",
    btn_next: "Suivant",
    btn_back: "Retour",
    btn_confirm: "Confirmer et Payer l'Acompte",
    
    // Home Page
    hero_title: "Transport Privé à Cancún, Playa del Carmen et Tulum",
    hero_subtitle: "Transferts aéroport, chauffeur privé à la journée et transport dédié vers les mosquées. Un service de confiance, respectueux et premium.",
    
    why_title: "Pourquoi Salam Transfers?",
    why_subtitle_small: "Un service auquel vous pouvez faire confiance.",
    why_trust_title: "Confiance Culturelle",
    why_trust_desc: "Véhicules 100% sans alcool, chauffeurs respectueux et respect des horaires de prière (Salat) et des mosquées locales.",
    why_private_title: "Privé & Premium",
    why_private_desc: "Pas de file d'attente ni de arrêts partagés. Transferts directs en camionnettes modernes avec ports USB.",
    why_support_title: "Support Bilingue",
    why_support_desc: "Assistance 24/7 en anglais, espagnol et arabe pour coordonner votre arrivée de manière optimale.",
    
    how_it_works_title: "Comment ça marche",
    step1_title: "Formulaire de Voyage",
    step1_desc: "Remplissez le formulaire avec vos coordonnées de voyage.",
    step2_title: "Devis Instantané",
    step2_desc: "Consultez votre devis instantanément à l'écran.",
    step3_title: "Acompte Sécurisé",
    step3_desc: "Confirmez votre réservation avec un acompte payé en ligne.",
    step4_title: "Confirmation Immédiate",
    step4_desc: "Recevez une confirmation par e-mail et WhatsApp, avec les coordonnées de votre chauffeur.",
    step5_title: "Contact du Chauffeur",
    step5_desc: "Votre chauffeur vous contacte la veille pour coordonner le point de rencontre.",
    step6_title: "Profitez & Réglez",
    step6_desc: "Profitez de votre voyage et payez le solde directement au chauffeur en espèces, carte ou transfert.",
    how_additional_transport_notice: "Si vous avez besoin de transport supplémentaire pendant votre visite — excursions, visites, transferts vers la mosquée ou retour à l'aéroport — contactez-nous par WhatsApp et nous vous attribuerons le chauffeur disponible. Réserver via Salam Transfers vous garantit une assistance bilingue 24h/24 et 7j/7, une facture officielle si nécessaire, et un soutien en cas d'imprévu.",

    audience_title: "Un service sur mesure pour vous",
    audience_families: "Familles Internationales",
    audience_families_desc: "Véhicules spacieux de 6 à 11 passagers avec grand coffre et sièges bébé disponibles sur demande préalable.",
    audience_muslim: "Voyageurs Musulmans",
    audience_muslim_desc: "Chauffeurs formés au respect du Salat, connaissant les mosquées locales de la Riviera Maya et garantissant un trajet serein.",
    audience_vip: "Événements & Mariages",
    audience_vip_desc: "Ponctualité rigoureuse, véhicules discrets et chauffeurs professionnels pour vos soirées, mariages et déplacements VIP.",

    // Services Page
    services_title: "Nos Services",
    serv_airport: "Transferts Aéroport",
    serv_airport_desc: "Service de transport privé simple ou aller-retour de l'Aéroport de Cancún vers tout hôtel ou villa de la Riviera Maya.",
    serv_driver: "Chauffeur Privé à la Journée",
    serv_driver_desc: "Découvrez la Riviera Maya à votre rythme avec une camionnette moderne et un chauffeur à votre entière disposition.",
    serv_mosque: "Transport vers les Mosquées",
    serv_mosque_desc: "Trajets sécurisés vers la Mezquita Al-Rahim à Cancún et la Mezquita Al-Rahman à Playa del Carmen.",
    serv_events: "Événements & Mariages",
    serv_events_desc: "Transport pour mariages, arrivées d'invités, événements islamiques, conférences et occasions spéciales.",
    capacity_6: "Jusqu'à 6 passagers",
    capacity_11: "Jusqu'à 11 passagers",
    inclusions_title: "Confort Inclus Standard",
    inc_flight: "Suivi de Vol",
    inc_sign: "Pancarte d'Accueil",
    inc_charger: "Chargeurs USB",
    inc_water: "Bouteille d'eau Offerte",
    inc_wifi: "WiFi Portatif",

    // Routes Page
    routes_title: "Tarifs et Itinéraires Transparents",
    routes_subtitle: "Tarifs fixes en pesos mexicains (MXN). Pas de frais d'aéroport cachés. Réservez avec acompte, payez le solde à l'arrivée.",
    table_route: "Itinéraire / Destination",
    table_cap6: "Camionnette Familiale (1-6 Pax)",
    table_cap11: "Camionnette Executive (7-11 Pax)",
    table_deposit: "Acompte Requis",
    table_action: "Réserver la Route",
    
    col_destino: "Destination",
    col_hasta6: "Jusqu'à 6 personnes",
    col_reserva6: "Réserver avec",
    col_hasta11: "Jusqu'à 11 personnes",
    col_reserva11: "Réserver avec",
    
    title_table1: "Origine Aéroport de Cancún",
    title_table2: "Origine Cancún Centre / Zone Hôtelière",
    title_table3: "Origine Playa del Carmen",
    title_table4: "Origine Tulum Centre",
    title_table5: "Tours de Cancún Centre / Zone Hôtelière",
    title_table6: "Tours de Playa del Carmen",
    title_table7: "Tours de Tulum",

    note_mxn: "Tous les tarifs sont en pesos mexicains (MXN).",
    note_type: "Tarifs aller simple pour les transferts; aller-retour avec attente incluse pour les excursions.",
    note_tolls: "Certaines destinations n'incluent pas les péages; cela est précisé dans le tableau et payé directement au chauffeur.",
    note_inquiries: "Consultez les tarifs pour les destinations non listées (parcs, cénotes, villages magiques, mosquée et événements).",

    place_cancun_hz: "Cancún Centre / Zone Hôtelière",
    place_costa_mujeres: "Costa Mujeres",
    place_puerto_morelos: "Puerto Morelos",
    place_playa_paraiso: "Playa Paraiso",
    place_playa_del_carmen: "Playa del Carmen",
    place_puerto_aventuras: "Puerto Aventuras",
    place_bahia_principe: "Bahia Principe",
    place_tulum_centro: "Tulum Centre",
    place_tulum_hz: "Tulum Zone Hôtelière",
    place_cancun_centro: "Cancún Centre",
    place_aeropuerto: "Aéroport",
    place_royalton: "Royalton",
    place_playa_local: "Playa del Carmen (local)",
    place_xcaret: "Xcaret",
    place_cancun_hz_short: "Cancún Zone Hôtelière / Centre",
    place_tulum: "Tulum",
    place_coba: "Coba",
    place_chichen_peaje: "Chichen Itza (péage inclus)",
    place_holbox_no_peaje: "Holbox (péage non inclus)",
    place_cancun: "Cancún",
    place_chichen_no_peaje: "Chichen Itza (péage non inclus)",
    place_chichen: "Chichen Itza",

    // Muslim Friendly Page
    muslim_title: "Voyages Muslim-Friendly d'Excellence",
    muslim_p1: "Chez Salam Transfers, nous sommes fiers d'être l'unique service de transport privé dans les Caraïbes mexicaines spécialisé dans l'accueil respectueux de la communauté musulmane internationale.",
    muslim_benefit_title: "Détails Qui Font la Différence",
    muslim_salat_title: "Aide pour le Salat (Prière)",
    muslim_salat_desc: "Nos chauffeurs connaissent les horaires des prières quotidiennes et ont identifié des aires de repos calmes et propres sur le trajet. Tapis de prière propres fournis sur demande.",
    muslim_env_title: "Environnement Sain et Pur",
    muslim_env_desc: "Nous garantissons des véhicules 100% sans tabac, sans alcool et sans mauvaises odeurs. Un trajet en paix pour vos enfants.",
    muslim_mosques_title: "Communauté Islamique Locale",
    muslim_mosques_desc: "Nous assurons vos déplacements en toute simplicité vers les lieux de culte de la région :",
    mosque_cancun: "Mosquée Al-Rahim (Cancún) - Premier espace islamique de l'État, un lieu d'échange spirituel magnifique.",
    mosque_playa: "Mosquée Al-Rahman (Playa del Carmen) - Idéalement située près du centre-ville pour vos prières.",

    // FAQ Page
    faq_title: "Foire Aux Questions",
    faq_subtitle: "Toutes les réponses à vos questions pour voyager sereinement dans les Caraïbes mexicaines.",

    // Contact Page
    contact_title: "Contact Direct",
    contact_subtitle: "Nous sommes disponibles 24/7 pour répondre à vos questions et organiser vos transferts.",
    contact_form_title: "Envoyez-nous un Message",
    contact_name: "Nom Complet",
    contact_email: "Adresse E-mail",
    contact_phone: "Numéro de Téléphone",
    contact_message: "Message / Demandes Spéciales",
    contact_send: "Envoyer le Message",
    contact_info_title: "Coordonnées",
    contact_hours_title: "Heures d'ouverture",
    contact_social_title: "Suivez-nous",
    contact_phone_label: "Téléphone & WhatsApp",
    contact_email_label: "E-mail",
    contact_web_label: "Site Web",
    contact_loc_label: "Localisation",
    contact_hours_desc: "Réservations en ligne 24/7. Réponses par WhatsApp en horaires élargis (6h00 - 23h00 heure locale).",

    // Booking Wizard Page
    book_title: "Réservez Votre Transport Privé",
    book_step1: "1. Informations",
    book_step2: "2. Devis",
    book_step3: "3. Acompte",
    book_step4: "4. Confirmation",
    
    lbl_service_type: "Type de Service",
    opt_airport: "Transfert Aéroport",
    opt_chauffeur: "Chauffeur Privé",
    opt_mosque: "Transit vers Mezquites",
    opt_events: "Événements & Mariages",
    
    lbl_vehicle_type: "Type de Véhicule",
    veh_sienna_title: "Jusqu'à 6 personnes",
    veh_sienna_desc: "Pour petites familles et bagages normaux.",
    veh_hiace_title: "Jusqu'à 11 personnes",
    veh_hiace_desc: "Pour groupes, grandes familles ou bagages supplémentaires.",
    veh_included_label: "Inclus dans tous les transferts:",
    veh_included_desc: "suivi de vol, pancarte à votre nom, chargeur USB et attente de courtoisie si votre vol est retardé.",
    
    lbl_route: "Sélectionnez l'Itinéraire",
    opt_route_cancun: "Aéroport de Cancún ↔ Cancún (Zone Hôtelière & Centre)",
    opt_route_playa: "Aéroport de Cancún ↔ Playa del Carmen",
    opt_route_tulum: "Aéroport de Cancún ↔ Tulum",
    opt_route_puerto: "Aéroport de Cancún ↔ Puerto Morelos, Costa Mujeres & Akumal",
    opt_route_aventuras: "Aéroport de Cancún ↔ Puerto Aventuras & Bahía Príncipe",
    lbl_pickup_loc: "Lieu de Prise en Charge (Origine)",
    lbl_dropoff_loc: "Destination Finale",
    lbl_flight_num: "Numéro de Vol & Compagnie",
    lbl_passengers: "Nombre de Passagers",
    lbl_luggage: "Valises Volumineuses",
    lbl_hours: "Heures Nécessaires (Min 4)",
    lbl_mosque_select: "Choisissez la Mosquée",
    
    quote_summary: "Résumé de votre Devis",
    quote_total: "Prix Total du Service",
    quote_deposit: "Acompte à Payer en ligne",
    quote_balance: "Reste à Payer au Chauffeur (Sur place)",
    
    pay_title: "Paiement Sécurisé via Stripe",
    pay_card: "Numéro de Carte",
    pay_holder: "Nom sur la Carte",
    pay_card_expiry: "MM/AA",
    pay_cvv: "CVV",
    pay_secure: "Paiement crypté protégé par protocole SSL de 256 bits",
    
    success_title: "Réservation Confirmée !",
    success_subtitle: "Votre trajet a été programmé avec succès. Un reçu d'acompte a été envoyé à votre adresse e-mail.",
    success_num_label: "Code de Réservation",
    success_driver_title: "Détails de Votre Chauffeur Assigné",
    success_driver_name: "Nom du Chauffeur",
    success_driver_car: "Modèle du Véhicule",
    success_driver_plate: "Plaque d'Immatriculation",
    success_whatsapp_cta: "Envoyer la confirmation par WhatsApp",
    success_delay_courtesy: "Suivi de vol : En cas de retard, le chauffeur vous attend gratuitement.",
    
    // Custom FAQs
    faq_bottom_text: "Avez-vous d'autres questions qui ne figurent pas ici ?",
    faq_q1: "Les transferts sont-ils privés ou partagés ?",
    faq_a1: "Tous nos transferts sont privés. Vous ne partagez pas le véhicule avec d'autres passagers — seulement avec votre famille ou votre groupe.",
    faq_q2: "Servez-vous uniquement des clients musulmans ?",
    faq_a2: "Non. Salam Transfers est ouvert à tout voyageur qui préfère un environnement respectueux et paisible.",
    faq_q3: "Pouvez-vous m'emmener à la mosquée le vendredi ?",
    faq_a3: "Oui. Nous proposons un transport dédié vers les mosquées Masjid Al-Rahim (Cancun) et Masjid Al-Rahman (Playa del Carmen), avec service d'attente pendant la prière.",
    faq_q4: "Comment fonctionne le paiement ?",
    faq_a4: "Vous confirmez votre réservation avec un acompte payé en ligne. Le solde restant est payé directement au chauffeur le jour du service en espèces, carte ou virement.",
    faq_q5: "L'acompte est-il remboursable ?",
    faq_a5: "Non. L'acompte garantit votre réservation et n'est pas remboursable. Cependant, vous pouvez modifier la date ou l'heure sans frais au moins 24 heures à l'avance, sous réserve de disponibilité.",
    faq_q6: "Proposez-vous un service à la journée pour des excursions ?",
    faq_a6: "Oui. Nous proposons un chauffeur privé à l'heure, à la demi-journée ou à la journée pour des excursions, parcs, cénotes, shopping ou tout itinéraire de votre choix.",
    faq_q7: "Pouvez-vous coordonner le transport pour un mariage ou un événement ?",
    faq_a7: "Oui. Nous coordonnons le transport pour les mariages à destination, les événements islamiques et les conférences. Demandez un devis personnalisé.",
    faq_q8: "Que se passe-t-il si mon vol est retardé ?",
    faq_a8: "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires dans un délai raisonnable.",
    faq_q9: "Avez-vous des sièges pour enfants ?",
    faq_a9: "Oui, sur demande préalable. Veuillez l'indiquer lors de la réservation et nous confirmerons la disponibilité.",
    faq_q10: "Parlez-vous anglais, français ou arabe ?",
    faq_a10: "Notre équipe gère les réservations en espagnol et en anglais. Pour des services en français ou en arabe, écrivez-nous à l'avance et nous coordonnerons.",
    faq_q11: "Comment puis-je payer le solde au chauffeur ?",
    faq_a11: "Nous acceptons les espèces (MXN ou USD), les cartes de crédit/débit ou le virement bancaire.",
    faq_q12: "Dois-je réserver à l'avance ?",
    faq_a12: "Nous vous recommandons de réserver au moins 24 heures à l'avance pour garantir la disponibilité, en particulier pendant la haute saison.",
    faq_q13: "Les tarifs incluent-ils les péages ?",
    faq_a13: "Certaines destinations oui, d'autres non. C'est clairement indiqué dans le tableau des tarifs. Les péages non inclus sont payés directement au chauffeur pendant le trajet.",
    serv_airport_p: "Nous offrons un service direct et exclusif pour votre groupe familial. Notre chauffeur vous attendra au point de rencontre de l'aéroport pour vous aider avec vos bagages et commencer votre séjour de la manière la plus confortable sans retards.",
    serv_driver_p: "Idéal pour les visites de sites archéologiques tels que Tulum, Chichen Itza ou Coba, de parcs à thèmes comme Xcaret, de cénotes cachés ou de zones commerciales. Oubliez la coordination de plusieurs taxis et voyagez en toute sécurité avec un chauffeur qui connaît parfaitement les meilleurs itinéraires de la région.",
    serv_mosque_p: "Pour votre tranquillité d'esprit spirituelle et votre confort pendant vos vacances, nous organisons des transferts aller-retour pour les prières du vendredi (Jummah) ou les prières quotidiennes. Nous coordonnons la prise en charge à votre hôtel pour assurer votre arrivée à temps et le retour en toute sécurité de votre famille.",
    serv_events_p: "Nous proposons des solutions logistiques de transport complètes pour les petits et grands groupes. Nous veillons à ce que vos invités soient transportés de manière ponctuelle, sûre et avec les plus hauts standards de confort, en offrant un support de coordination directe 24h/24 et 7j/7.",
    muslim_p2: "Notre mission est de rendre votre séjour à Cancun et sur la Riviera Maya complètement agréable et sans souci, vous permettant de profiter des beautés des Caraïbes mexicaines sans compromettre vos valeurs et pratiques spirituelles quotidiennes.",
    muslim_salat_note: "Indiquez simplement à votre chauffeur quand c'est l'heure de la prière, et il coordonnera avec plaisir un arrêt approprié dans une mosquée à proximité ou un endroit calme et propre le long du trajet.",
    muslim_env_note: "Nous croyons fermement au respect du client. Nos camionnettes sont rigoureusement désinfectées après chaque service, maintenant un environnement propre, neutre et confortable pour vous et vos enfants.",
    mosque_cancun_title: "Mosquée Al-Rahim (Cancun)",
    mosque_playa_title: "Mosquée Al-Rahman (Playa del Carmen)",
    step1_note: "Le processus est 100% en ligne et prend moins de 2 minutes.",
    step2_note: "Tarifs fixes et transparentes en MXN, sans frais cachés ni tarifs surprise.",
    step3_note: "Traité de manière sécurisée via Stripe avec un cryptage SSL 256 bits.",
    step4_note: "Nous vous envoyons votre code de réservation unique et les détails du véhicule attribué.",
    step5_note: "Pour votre tranquillité d'esprit, nous coordonnons directement via WhatsApp ou par appel avant votre arrivée.",
    step6_note: "Profitez de votre voyage et réglez le solde directement avec le chauffeur en espèces, carte ou virement.",
    policy_deposit_title: "Acompte de Réservation",
    policy_deposit_desc: "Pour garantir la réservation et bloquer le véhicule avec son chauffeur attribué, un acompte partiel est facturé en ligne. <strong>Cet acompte n'est pas remboursable</strong> si le client annule unilatéralement le service.",
    policy_changes_title: "Modifications de Date Gratuites",
    policy_changes_desc: "Nous comprenons que les plans de voyage peuvent changer. Nous permettons des modifications des dates et heures de transfert sans pénalités <strong>jusqu'à 24 heures avant</strong> l'heure prévue du service.",
    policy_delay_title: "Courtoisie pour Retard",
    policy_delay_desc: "Si votre vol est retardé, ne vous inquiétez pas. Nous suivons constamment le statut de votre vol. Votre chauffeur <strong>vous attendra gratuitement</strong> aussi longtemps que nécessaire après votre atterrissage réel."
  },
  ar: {
    // Navigation
    nav_home: "الرئيسية",
    nav_services: "الخدمات",
    nav_routes: "الطرق والأسعار",
    nav_muslim: "ملائم للمسلمين",
    nav_how: "كيف نعمل",
    nav_faq: "الأسئلة الشائعة",
    nav_booking: "احجز الآن",
    nav_contact: "اتصل بنا",
    
    // Global Elements
    footer_summary: "نقل خاص مميز في كانكون وريفييرا مايا. نقدم الثقة والالتزام بالمواعيد والخدمة المحترمة المصممة خصيصًا للعائلات الدولية والمسافرين المسلمين.",
    footer_links_title: "الخدمات",
    footer_info_title: "معلومات",
    footer_legal_title: "قانوني",
    footer_rights: "© 2026 سلام ترانسفيرز. جميع الحقوق محفوظة.",
    whatsapp_text: "مرحباً سلام ترانسفيرز، لدي سؤال أو طلب خاص بخصوص رحلتي القادمة إلى ريفييرا مايا. هل يمكن لأحد الوكلاء مساعدتي؟ شكراً لكم!",
    legal_terms: "شروط الخدمة",
    legal_privacy: "سياسة الخصوصية",
    legal_cancellation: "سياسة الإلغاء",

    // Terms Page
    terms_title: "شروط الخدمة",
    terms_last_updated: "آخر تحديث: 22 مايو 2026",
    terms_h1: "1. قبول الشروط",
    terms_p1: "من خلال الوصول وحجز خدمات النقل الخاصة مع سلام ترانسفيرز، فإنك توافق على الالتزام قانونياً بشروط الخدمة هذه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.",
    terms_h2: "2. الحجز والعربون",
    terms_p2: "يلزم دفع عربون آمن عبر الإنترنت لتأكيد جميع الحجوزات. يحجز هذا العربون المركبة والسائق المخصصين لك. يجب دفع الرصيد المتبقي مباشرة إلى السائق عند الوصول إلى وجهتك. يتم تسعير الخدمات بالبيزو المكسيكي (MXN) ولكن يمكن سدادها بالدولار الأمريكي (USD) أو اليورو (EUR) بناءً على أسعار الصرف المعتمدة وقت النقل.",
    terms_h3: "3. سلوك الركاب",
    terms_p3: "للحفاظ على معايير الخدمة الراقية والبيئة الملائمة للمسلمين (Muslim-friendly)، يُمنع منعاً باتاً تناول المشروبات الكحولية، التدخين بجميع أنواعه (بما في ذلك السجائر الإلكترونية/الفيب)، والسلوك العدواني أو غير اللائق داخل المركبة. يحتفظ السائق بالحق في رفض تقديم الخدمة لأي راكب يخالف هذه الشروط، دون أي حق في استرداد الأموال.",
    terms_h4: "4. تأخر الرحلات الجوية والتتبع في الوقت الفعلي",
    terms_p4: "نحن نتابع جميع الرحلات الجوية التجارية بنشاط. لا توجد رسوم إضافية على الرحلات المتأخرة. سينتظرك السائق بناءً على وقت الهبوط الفعلي لرحلتك. ومع ذلك، في حال إلغاء الرحلة أو حجز رحلة برقم آخر، يجب عليك إخطار سلام ترانسفيرز في أقرب وقت لضمان إعادة تخصيص السائق.",
    terms_h5: "5. تحديد المسؤولية",
    terms_p5: "سلام ترانسفيرز غير مسؤولة عن التأخر في الوصول بسبب إغلاق الطرق السريعة، أو النزاعات المدنية، أو الظروف الجوية القاسية، أو التأخير الجمركي في المطار. ننصح الركاب بالتخطيط للمغادرة بوقت كافٍ لإنهاء إجراءات المطار الدولي (قبل 3 ساعات على الأقل من موعد الرحلة).",

    // Privacy Page
    privacy_title: "سياسة الخصوصية",
    privacy_h1: "1. المعلومات التي نجمعها",
    privacy_p1: "نحن نجمع المعلومات الشخصية اللازمة لتنظيم وتلبية طلبات النقل الخاصة بك، بما في ذلك: الاسم الكامل، عنوان البريد الإلكتروني، رقم الهاتف/الواتساب، أرقام الرحلات الجوية، التواريخ، ومواقع الالتقاء والتوصيل. نحن لا نخزن بيانات بطاقات الائتمان الكاملة؛ ويتم معالجة جميع المعاملات المالية بشكل آمن مباشرة بواسطة Stripe بوابة الدفع الخاصة بنا.",
    privacy_h2: "2. كيف نستخدم معلوماتك",
    privacy_p2: "تُستخدم تفاصيلك بدقة لتنسيق انتقالاتك الخاصة، وإرسال تفاصيل وصول السائق، وإرسال فواتير العربون، وإدارة تحديثات تأخر الرحلات مجاناً. نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة.",
    privacy_h3: "3. حماية البيانات والاحتفاظ بها",
    privacy_p3: "نحن نطبق بنيات قواعد بيانات آمنة وشهادات تشفير SSL لحماية تفاصيلك الشخصية ضد الوصول غير المصرح به. نحن نحتفظ بسجلات السفر فقط للفترة اللازمة للامتثال الإداري، ودعم العملاء، ومسك الدفاتر المالية.",
    privacy_h4: "4. حقوقك",
    privacy_p4: "لديك الحق في طلب الوصول إلى بياناتك الشخصية المخزنة في أنظمة الحجز لدينا، أو تصحيحها، أو مسحها. يمكنك ممارسة هذه الحقوق في أي وقت عن طريق الاتصال بفريق الدعم لدينا عبر البريد الإلكتروني privacy@salamtransfers.com.",

    // Cancellation Page
    cancel_title: "سياسة الإلغاء والتعديل",
    cancel_h1: "1. قواعد الإلغاء",
    cancel_p1: "يمكن إلغاء الحجوزات في أي وقت عن طريق إخطار مكتب الدعم لدينا عبر البريد الإلكتروني أو الواتساب. يرجى العلم بأن العربون المدفوع عبر الإنترنت أثناء الحجز غير قابل للاسترداد نهائياً. يخدم هذا المبلغ تأمين حجز السائق والمركبة وحماية جدول أعمالنا التشغيلي.",
    cancel_h2: "2. التعديلات المجانية وتغيير التواريخ",
    cancel_p2: "نحن نسمح بتغييرات غير محدودة للتواريخ والأوقات ومسارات المركبات مجاناً حتى 24 ساعة قبل موعد الخدمة المقرر. إذا كان المسار الجديد يترتب عليه سعر أعلى، يجب على العميل دفع الفارق عند الوصول. وإذا كان أقل تكلفة، فسيتم تخفيض الرصيد المتبقي المستحق للسائق وفقاً لذلك.",
    cancel_h3: "3. تأخير وإلغاء الرحلات الجوية",
    cancel_p3: "تتتبع سلام ترانسفيرز جميع الرحلات الجوية القادمة. إذا تأخرت رحلتك، فإن وقت انتظار السائق مجاني بالكامل، بغض النظر عن مدة التأخير. وفي حال إلغاء الرحلة من قبل شركة الطيران، سيتم الاحتفاظ بالعربون كقسيمة رصيد صالحة للاستخدام في أي حجز مستقبلي خلال 365 يوماً.",
    cancel_h4: "4. عدم الحضور (No-Show)",
    cancel_p4: "إذا لم يصل العميل إلى نقطة الالتقاء المحددة خلال 90 دقيقة من الهبوط الرسمي للرحلة، ولم يتواصل مع مكتب الدعم لدينا، فسيتم تصنيف الخدمة على أنها 'عدم حضور'. وفي هذه الحالة، يُلغى الحجز ويُصادر العربون بالكامل.",
    
    // Shared CTAs
    btn_book_now: "احجز الآن",
    btn_whatsapp: "واتساب مباشر",
    btn_contact: "اتصل بنا",
    btn_next: "التالي",
    btn_back: "رجوع",
    btn_confirm: "تأكيد ودفع العربون",
    
    // Home Page
    hero_title: "نقل خاص في كانكون، بلايا ديل كارمن، وتولوم",
    hero_subtitle: "توصيل من المطار، سائق خاص لليوم، ونقل مخصص للمساجد. خدمة راقية، محترمة، وذات موثوقية تامة.",
    
    why_title: "لماذا سلام ترانسفيرز؟",
    why_subtitle_small: "خدمة يمكنك الوثوق بها.",
    why_trust_title: "ثقة ثقافية ومسلمة",
    why_trust_desc: "سيارات خالية تماماً من الكحول، سائقون محترمون، ومعرفة كاملة بمواعيد الصلاة والمساجد المحلية.",
    why_private_title: "خاص ومميز",
    why_private_desc: "بدون صفوف انتظار أو توقفات مشتركة. نقل مباشر في حافلات حديثة ومكيفة ومجهزة بشواحن USB.",
    why_support_title: "دعم متعدد اللغات",
    why_support_desc: "مساعدة على مدار الساعة باللغات الإسبانية والإنجليزية والعربية لتنسيق وصولكم بشكل مثالي.",
    
    how_it_works_title: "كيف يعمل هذا المجال؟",
    step1_title: "نموذج تفاصيل السفر",
    step1_desc: "أكمل النموذج ببيانات رحلتك.",
    step2_title: "عرض سعر فوري",
    step2_desc: "راجع عرض السعر فوراً على الشاشة.",
    step3_title: "دفعة مقدمة آمنة",
    step3_desc: "أكد حجزك بدفعة مقدمة مدفوعة عبر الإنترنت.",
    step4_title: "تأكيد فوري",
    step4_desc: "احصل على تأكيد عبر البريد الإلكتروني والواتساب، مع بيانات سائقك.",
    step5_title: "تواصل السائق",
    step5_desc: "يتصل بك سائقك في اليوم السابق لتنسيق نقطة الالتقاء.",
    step6_title: "استمتع وسدد",
    step6_desc: "استمتع برحلتك وسدد الرصيد المتبقي مباشرة للسائق نقداً أو بالبطاقة أو بالتحويل البنكي.",
    how_additional_transport_notice: "إذا كنت بحاجة إلى وسائل نقل إضافية أثناء زيارتك - الجولات السياحية، النزهات، الانتقالات إلى المسجد، أو العودة إلى المطار - تواصل معنا عبر الواتساب وسنقوم بتعيين السائق المتاح لك. يضمن لك الحجز عبر سلام ترانسفيرز خدمة عملاء ثنائية اللغة على مدار الساعة طوال أيام الأسبوع، وفاتورة رسمية إذا كنت بحاجة إليها، والدعم الكامل في حال حدوث أي ظرف طارئ.",

    audience_title: "خدمة مصممة خصيصاً لك",
    audience_families: "العائلات الدولية",
    audience_families_desc: "سيارات واسعة تتسع لـ 6 إلى 11 راكباً مع مساحة فسيحة للأمتعة ومقاعد للأطفال متوفرة عند الطلب المسبق.",
    audience_muslim: "المسافرون المسلمون",
    audience_muslim_desc: "سائقون يحترمون مواقيت الصلاة، ويعرفون المساجد المحلية في كينتانا رو، ويحافظون على نظافة وهدوء المركبة.",
    audience_vip: "الشركات وحفلات الزفاف",
    audience_vip_desc: "دقة صارمة في المواعيد، سيارات سوداء أنيقة، وسائقون محترفون لحفلات الزفاف والمناسبات ونقل كبار الشخصيات.",

    // Services Page
    services_title: "خدماتنا",
    serv_airport: "النقل من وإلى المطار",
    serv_airport_desc: "توصيل خاص في اتجاه واحد أو ذهاباً وإياباً من مطار كانكون إلى أي فندق أو فيلا في ريفييرا مايا.",
    serv_driver: "سائق خاص لليوم",
    serv_driver_desc: "اكتشف ريفييرا مايا بحرية تامة مع حافلة حديثة وسائق محترف مخصص لك بالكامل طوال اليوم.",
    serv_mosque: "النقل إلى المساجد",
    serv_mosque_desc: "توصيل آمن وموثوق إلى مسجد الرحيم في كانكون ومسجد الرحمن في بلايا ديل كارمن.",
    serv_events: "المناسبات وحفلات الزفاف",
    serv_events_desc: "النقل لحفلات الزفاف، وصول الضيوف، الفعاليات الإسلامية، المؤتمرات والمناسبات الخاصة.",
    capacity_6: "حتى 6 ركاب",
    capacity_11: "حتى 11 راكباً",
    inclusions_title: "معايير الراحة المشمولة مجاناً",
    inc_flight: "تتبع الرحلة الجوية",
    inc_sign: "لوحة ترحيبية بالاسم",
    inc_charger: "مخارج شحن USB",
    inc_water: "مياه معدنية مجانية",
    inc_wifi: "إنترنت لاسلكي متنقل",

    // Routes Page
    routes_title: "طرق وأسعار واضحة وشفافة",
    routes_subtitle: "أسعار ثابتة بالبيزو المكسيكي (MXN). لا رسوم مطار مخفية. احجز بعربون، وادفع الباقي عند الوصول.",
    table_route: "الوجهة / الطريق",
    table_cap6: "حافلة عائلية (1-6 ركاب)",
    table_cap11: "حافلة تنفيذية (7-11 راكباً)",
    table_deposit: "العربون المطلوب للتأكيد",
    table_action: "احجز هذا الطريق",
    
    col_destino: "الوجهة",
    col_hasta6: "حتى 6 أشخاص",
    col_reserva6: "احجز بـ",
    col_hasta11: "حتى 11 شخصاً",
    col_reserva11: "احجز بـ",
    
    title_table1: "نقطة الانطلاق مطار كانكون",
    title_table2: "نقطة الانطلاق وسط كانكون / المنطقة الفندقية",
    title_table3: "نقطة الانطلاق بلايا ديل كارمن",
    title_table4: "نقطة الانطلاق وسط تولوم",
    title_table5: "جولات من وسط كانكون / المنطقة الفندقية",
    title_table6: "جولات من بلايا ديل كارمن",
    title_table7: "جولات من تولوم",

    note_mxn: "جميع الأسعار بالبيزو المكسيكي (MXN).",
    note_type: "أسعار ذهاب فقط للانتقالات؛ وذهاب وعودة مع وقت الانتظار مشمول للجولات.",
    note_tolls: "بعض الوجهات لا تشمل رسوم المرور؛ يتم توضيح ذلك في الجدول ويتم الدفع مباشرة للسائق.",
    note_inquiries: "يرجى الاستفسار عن أسعار الوجهات غير المدرجة (المنتزهات، السنوتات، المدن السحرية، المساجد والفعاليات).",

    place_cancun_hz: "كانكون وسط المدينة / المنطقة الفندقية",
    place_costa_mujeres: "كوستا موخيريس",
    place_puerto_morelos: "بويرتو موريلوس",
    place_playa_paraiso: "بلايا بارايسو",
    place_playa_del_carmen: "بلايا ديل كارمن",
    place_puerto_aventuras: "بويرتو أفينتوراس",
    place_bahia_principe: "باهيا برينسيبي",
    place_tulum_centro: "تولوم وسط المدينة",
    place_tulum_hz: "تولوم المنطقة الفندقية",
    place_cancun_centro: "كانكون وسط المدينة",
    place_aeropuerto: "المطار",
    place_royalton: "رويال تان",
    place_playa_local: "بلايا ديل كارمن (محيط محلي)",
    place_xcaret: "إكسكاريت",
    place_cancun_hz_short: "كانكون المنطقة الفندقية / وسط المدينة",
    place_tulum: "تولوم",
    place_coba: "كوبا",
    place_chichen_peaje: "تشيتشن إيتزا (الرسوم مشمولة)",
    place_holbox_no_peaje: "هولبوكس (الرسوم غير مشمولة)",
    place_cancun: "كانكون",
    place_chichen_no_peaje: "تشيتشن إيتزا (الرسوم غير مشمولة)",
    place_chichen: "تشيتشن إيتزا",

    // Muslim Friendly Page
    muslim_title: "الريادة في السفر الملائم للمسلمين",
    muslim_p1: "في سلام ترانسفيرز، نفخر بكوننا خدمة النقل الخاصة الوحيدة في الكاريبي المكسيكي المتخصصة في خدمة الجالية المسلمة الدولية باحترام وتقدير بالغين.",
    muslim_benefit_title: "تفاصيل تصنع الفارق",
    muslim_salat_title: "دعم مواقيت الصلاة (Salat)",
    muslim_salat_desc: "سائقونا على دراية تامة بمواقيت الصلاة اليومية وحددوا مسبقاً أماكن هادئة ونظيفة للتوقف والصلاة على الطريق السريع. تتوفر سجادات صلاة نظيفة في السيارة عند الطلب.",
    muslim_env_title: "بيئة عائلية طاهرة ونقية",
    muslim_env_desc: "نضمن سيارات خالية 100% من الكحول والتدخين والروائح المزعجة. بيئة يسودها السلام والراحة لعائلتك وأطفالك.",
    muslim_mosques_title: "المجتمع الإسلامي المحلي",
    muslim_mosques_desc: "نأخذك بكل أريحية إلى مراكز الصلاة الرئيسية في المنطقة:",
    mosque_cancun: "مسجد الرحيم (كانكون) - أول مسجد ومركز إسلامي في ولاية كينتانا رو، ملتقى روحاني وثقافي رائع.",
    mosque_playa: "مسجد الرحمن (بلايا ديل كارمن) - يقع في موقع استراتيجي بالقرب من وسط المدينة لأداء الصلوات اليومية.",

    // FAQ Page
    faq_title: "الأسئلة الشائعة",
    faq_subtitle: "كل ما تحتاج إلى معرفته عن النقل الخاص في كانكون وريفييرا مايا.",

    // Contact Page
    contact_title: "اتصال مباشر",
    contact_subtitle: "نحن متواجدون على مدار الساعة للرد على استفساراتكم وتنسيق رحلاتكم الخاصة.",
    contact_form_title: "أرسل لنا رسالة",
    contact_name: "الاسم الكامل",
    contact_email: "البريد الإلكتروني",
    contact_phone: "رقم الهاتف",
    contact_message: "الرسالة / طلبات خاصة",
    contact_send: "إرسال الرسالة",
    contact_info_title: "معلومات الاتصال",
    contact_hours_title: "ساعات العمل",
    contact_social_title: "تابعنا",
    contact_phone_label: "الهاتف وواتساب",
    contact_email_label: "البريد الإلكتروني",
    contact_web_label: "الموقع الإلكتروني",
    contact_loc_label: "الموقع",
    contact_hours_desc: "الحجز عبر الإنترنت 24/7. الرد عبر واتساب خلال ساعات العمل الممتدة (6:00 صباحاً - 11:00 مساءً بالتوقيت المحلي).",

    // Booking Wizard Page
    book_title: "احجز رحلتك الفاخرة الآن",
    book_step1: "1. بيانات السفر",
    book_step2: "2. عرض السعر",
    book_step3: "3. دفع العربون",
    book_step4: "4. التأكيد النهائي",
    
    lbl_service_type: "نوع الخدمة المطلوبة",
    opt_airport: "توصيل من/إلى المطار",
    opt_chauffeur: "سائق خاص باليوم",
    opt_mosque: "نقل إلى المسجد",
    opt_events: "المناسبات والزفاف",
    
    lbl_route: "اختر مسار الرحلة",
    opt_route_cancun: "مطار كانكون ↔ كانكون (المنطقة الفندقية والوسط)",
    opt_route_playa: "مطار كانكون ↔ بلايا ديل كارمن",
    opt_route_tulum: "مطار كانكون ↔ تولوم",
    opt_route_puerto: "مطار كانكون ↔ بويرتو موريلوس، كوستا موخيريس وأكومال",
    opt_route_aventuras: "مطار كانكون ↔ بويرتو أفينتوراس وباهيا برينسيبي",
    lbl_pickup_loc: "مكان الالتقاء (المصدر)",
    lbl_dropoff_loc: "الوجهة النهائية",
    lbl_flight_num: "رقم الرحلة الجوية والخطوط",
    lbl_passengers: "عدد الركاب",
    lbl_luggage: "عدد الحقائب الكبيرة",
    lbl_hours: "الساعات المطلوبة (حد أدنى 4)",
    lbl_mosque_select: "اختر المسجد",
    
    quote_summary: "ملخص تسعيرتك الخاصة",
    quote_total: "السعر الإجمالي للخدمة",
    quote_deposit: "العربون المطلوب دفعه الآن (آمن عبر الإنترنت)",
    quote_balance: "الرصيد المتبقي للسائق (عند الوصول)",
    
    pay_title: "دفع آمن ومحمي بواسطة Stripe",
    pay_card: "رقم بطاقة الدفع",
    pay_holder: "اسم صاحب البطاقة",
    pay_card_expiry: "الشهر/السنة",
    pay_cvv: "الرمز السري CVV",
    pay_secure: "عملية الدفع مشفرة بنظام SSL بحماية 256 بت",
    
    success_title: "تم تأكيد حجزك بنجاح!",
    success_subtitle: "تم جدولة موعد النقل الخاص بك بنجاح. تم إرسال إيصال دفع العربون إلى بريدك الإلكتروني.",
    success_num_label: "رقم مرجع الحجز",
    success_driver_title: "تفاصيل السائق الخاص بك (تلقائي)",
    success_driver_name: "اسم السائق",
    success_driver_car: "طراز الحافلة",
    success_driver_plate: "رقم اللوحة",
    success_whatsapp_cta: "إرسال التأكيد النهائي عبر واتساب",
    success_delay_courtesy: "متابعة الرحلة مفعلة: في حال تأخر طائرتك، سننتظرك مجاناً.",
    
    // Custom FAQs
    faq_bottom_text: "هل لديك أي أسئلة أخرى لم يتم إدراجها هنا؟",
    faq_q1: "هل الانتقالات خاصة أم مشتركة؟",
    faq_a1: "جميع انتقالاتنا خاصة. لن تشارك السيارة مع ركاب آخرين — فقط مع عائلتك أو مجموعتك.",
    faq_q2: "هل تخدمون العملاء المسلمين فقط؟",
    faq_a2: "لا، سلام ترانسفيرز مفتوحة لأي مسافر يفضل بيئة محترمة وهادئة.",
    faq_q3: "هل يمكنكم توصيلي إلى المسجد يوم الجمعة؟",
    faq_a3: "نعم، نحن نقدم خدمة نقل مخصصة إلى مسجدي الرحيم (كانكون) والرحمن (بلايا ديل كارمن)، مع خدمة الانتظار أثناء الصلاة.",
    faq_q4: "كيف تتم عملية الدفع؟",
    faq_a4: "تؤكد حجزك بدفع عربون عبر الإنترنت. ويتم دفع المبلغ المتبقي مباشرة للسائق يوم الخدمة نقداً أو بالبطاقة أو عن طريق التحويل البنكي.",
    faq_q5: "هل العربون مسترد؟",
    faq_a5: "لا، العربون يؤمن حجزك وغير مسترد. ومع ذلك، يمكنك تغيير التاريخ أو الوقت دون أي تكلفة إضافية قبل 24 ساعة على الأقل من الخدمة، وذلك حسب التوفر.",
    faq_q6: "هل تقدمون خدمة اليوم الكامل للجولات؟",
    faq_a6: "نعم، نحن نقدم خدمة سائق خاص بالساعة، أو لنصف يوم، أو ليوم كامل للجولات السياحية، والمنتزهات، والسينوت، والتسوق، أو أي مسار تختاره.",
    faq_q7: "هل يمكنكم تنسيق النقل لحفل زفاف أو حدث خاص؟",
    faq_a7: "نعم، نحن ننسق النقل لحفلات الزفاف الوجهة، والفعاليات الإسلامية، والمؤتمرات. يرجى طلب اقتباس مخصص.",
    faq_q8: "ماذا يحدث إذا تأخرت رحلتي الجوية؟",
    faq_a8: "نحن نراقب رحلتك في الوقت الفعلي ونقوم بتعديل وقت الاستلام دون أي تكلفة إضافية ضمن نطاق معقول.",
    faq_q9: "هل تتوفر لديكم مقاعد للأطفال؟",
    faq_a9: "نعم، بناءً على طلب مسبق. يرجى تحديد ذلك عند الحجز وسنقوم بتأكيد التوفر.",
    faq_q10: "هل تتحدثون الإنجليزية أو الفرنسية أو العربية؟",
    faq_a10: "يتعامل فريقنا مع الحجوزات باللغتين الإسبانية والإنجليزية. للخدمات باللغة الفرنسية أو العربية، يرجى مراسلتنا مسبقًا وسنقوم بالتنسيق.",
    faq_q11: "كيف يمكنني دفع المبلغ المتبقي للسائق؟",
    faq_a11: "نقبل الدفع نقداً (بالمكسيكي MXN أو الدولار الأمريكي USD)، أو ببطاقة الائتمان/الخصم، أو بالتحويل البنكي.",
    faq_q12: "هل أحتاج إلى الحجز مسبقًا؟",
    faq_a12: "ننصح بالحجز قبل 24 ساعة على الأقل لضمان التوفر، خاصة في المواسم المزدحمة.",
    faq_q13: "هل تشمل الأسعار رسوم الطرق (البوابة)؟",
    faq_a13: "بعض الوجهات تشملها وبعضها لا. تم توضيح ذلك بوضوح في جدول الأسعار. رسوم الطرق غير المشمولة يتم دفعها مباشرة للسائق أثناء الرحلة.",
    serv_airport_p: "نحن نقدم خدمة مباشرة وحصرية لمجموعتك العائلية. سيكون سائقنا في انتظارك عند نقطة الالتقاء بالمطار لمساعدتك في أمتعتك وبدء إقامتك بأكثر الطرق راحة ودون تأخير.",
    serv_driver_p: "مثالي لزيارة المواقع الأثرية مثل تولوم، تشيتشن إيتزا أو كوبا، أو المنتزهات الترفيهية مثل إكسكاريت، أو السينوت الخفية، أو مناطق التسوق. انسَ تنسيق سيارات أجرة متعددة وسافر بأمان مع سائق يعرف أفضل الطرق في المنطقة تماماً.",
    serv_mosque_p: "من أجل طمأنينتك الروحية وراحتك أثناء عطلتك، ننظم انتقالات ذهاب وعودة لصلاة الجمعة أو الصلوات اليومية. نحن ننسق عملية الاستلام من فندقك لضمان وصولك في الوقت المناسب والعودة الآمنة لعائلتك.",
    serv_events_p: "نحن نقدم حلولاً لوجستية متكاملة للنقل للمجموعات الصغيرة والكبيرة. نحن نضمن نقل ضيوفك في الوقت المحدد، وبأمان، وبأعلى معايير الراحة، مع تقديم دعم تنسيق مباشر على مدار الساعة.",
    muslim_p2: "مهمتنا هي جعل إقامتك في كانكون وريفييرا مايا ممتعة تماماً وخالية من القلق، مما يتيح لك الاستمتاع بجمال الكاريبي المكسيكي دون المساومة على قيمك وممارساتك الروحية اليومية.",
    muslim_salat_note: "ما عليك سوى إبلاغ سائقك عندما يحين وقت الصلاة، وسيقوم بكل سرور بتنسيق توقف مناسب في مسجد قريب أو مكان هادئ ونظيف على طول الطريق.",
    muslim_env_note: "نحن نؤمن بشدة باحترام العميل. يتم تعقيم حافلاتنا بدقة بعد كل خدمة، مما يحافظ على بيئة نظيفة ومحايدة ومريحة لك ولأطفالك.",
    mosque_cancun_title: "مسجد الرحيم (كانكون)",
    mosque_playa_title: "مسجد الرحمن (بلايا ديل كارمن)",
    step1_note: "العملية تتم بنسبة 100% عبر الإنترنت وتستغرق أقل من دقيقتين.",
    step2_note: "أسعار ثابتة وشفافة بالبيزو المكسيكي، بدون رسوم مخفية أو أسعار مفاجئة.",
    step3_note: "تمت معالجته بشكل آمن عبر Stripe باستخدام تشفير SSL بقوة 256 بت.",
    step4_note: "نرسل لك رمز الحجز الفريد وتفاصيل السيارة المخصصة.",
    step5_note: "من أجل طمأنينتك، ننسق معك مباشرة عبر الواتساب أو الاتصال الهاتفي قبل وصولك.",
    step6_note: "استمتع برحلتك وادفع الرصيد المتبقي مباشرة للسائق نقداً أو بالبطاقة أو بالتحويل البنكي.",
    policy_deposit_title: "دفعة تأكيد الحجز المقدمة",
    policy_deposit_desc: "لضمان الحجز وتأمين السيارة مع السائق المخصص لها، يتم تحصيل دفعة مقدمة جزئية عبر الإنترنت. <strong>هذه الدفعة غير مستردة</strong> إذا ألغى العميل الخدمة من جانب واحد.",
    policy_changes_title: "تغيير التواريخ مجاناً",
    policy_changes_desc: "نحن نتفهم أن خطط السفر قد تتغير. ونحن نسمح بإجراء تعديلات على تواريخ وأوقات النقل دون غرامات <strong>قبل ما يصل إلى 24 ساعة</strong> من وقت الخدمة المحدد.",
    policy_delay_title: "خدمة انتظار مجانية عند التأخر",
    policy_delay_desc: "إذا تأخرت رحلتك الجوية، فلا تقلق. نحن نراقب حالة رحلتك باستمرار. وسينتظرك سائقك <strong>مجاناً</strong> لأي مدة قد يتطلبها الأمر بعد هبوطك الفعلي."
  }
};

// --- Localization Core Engine ---
// URL is the source of truth: /es/* → es, /fr/* → fr, /ar/* → ar, else → en.
// The lang switcher navigates to the corresponding URL so each language has its
// own indexable canonical (real SEO benefit instead of client-side swap).
const SUPPORTED_LANGS = ['en', 'es', 'fr', 'ar'];
const LANG_PREFIX_REGEX = /^\/(es|fr|ar)(\/|$)/;

function getLanguageFromPath() {
  const match = window.location.pathname.match(LANG_PREFIX_REGEX);
  return match ? match[1] : 'en';
}

function getPageRelativePath() {
  // Returns the path of the current page WITHOUT any language prefix.
  // Used to map between language versions of the same page.
  let p = window.location.pathname;
  p = p.replace(LANG_PREFIX_REGEX, '/');
  // Strip leading slash; index files become 'index.html'
  if (p === '/' || p === '') return '';
  if (p.endsWith('/')) return p.slice(1);
  return p.replace(/^\//, '');
}

function buildLanguageUrl(lang, page) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  if (!page) return `${prefix}/`;
  return `${prefix}/${page}`;
}

function detectBrowserLanguage() {
  try {
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    const prefix = browserLang.split('-')[0];
    if (SUPPORTED_LANGS.includes(prefix)) return prefix;
  } catch (e) { /* ignore */ }
  return 'en';
}

function getLanguage() {
  return getLanguageFromPath();
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  try {
    localStorage.setItem('salam_lang', lang);
  } catch (e) {
    console.warn("localStorage is blocked, cannot persist lang selection:", e);
  }
  const currentLang = getLanguageFromPath();
  if (lang === currentLang) return;
  const page = getPageRelativePath();
  window.location.href = buildLanguageUrl(lang, page);
}

// One-time soft suggestion on root EN visits: if the user previously selected
// a different language, hint with a discreet toast (no auto-redirect — that
// hurts SEO and confuses crawlers).
function maybeShowLanguageHint() {
  if (getLanguageFromPath() !== 'en') return;
  try {
    const saved = localStorage.getItem('salam_lang');
    if (!saved || saved === 'en' || !SUPPORTED_LANGS.includes(saved)) return;
    if (sessionStorage.getItem('salam_lang_hint_dismissed') === '1') return;
    // Defer to next tick so it doesn't block paint
    setTimeout(() => showLanguageHint(saved), 800);
  } catch (e) { /* ignore */ }
}

function showLanguageHint(savedLang) {
  const labels = { es: 'Ver en español', fr: 'Voir en français', ar: 'مشاهدة بالعربية' };
  const label = labels[savedLang];
  if (!label) return;
  const page = getPageRelativePath();
  const url = buildLanguageUrl(savedLang, page);
  const hint = document.createElement('div');
  hint.setAttribute('role', 'status');
  hint.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#0a0a0a;color:#fff;padding:0.75rem 1.25rem;border:1px solid rgba(151,134,100,0.4);border-radius:8px;font-size:0.9rem;display:flex;gap:1rem;align-items:center;z-index:1100;box-shadow:0 6px 20px rgba(0,0,0,0.5);';
  hint.innerHTML = `<a href="${url}" style="color:#caa052;font-weight:600;text-decoration:none;">${label} →</a><button aria-label="Dismiss" style="background:transparent;border:none;color:#aaa;font-size:1.1rem;cursor:pointer;line-height:1;">×</button>`;
  hint.querySelector('button').addEventListener('click', () => {
    try { sessionStorage.setItem('salam_lang_hint_dismissed', '1'); } catch (e) {}
    hint.remove();
  });
  document.body.appendChild(hint);
}

function updatePageLanguage(lang) {
  // Update HTML Lang and Dir attributes
  document.documentElement.lang = lang;
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.removeAttribute('dir');
  }

  // Update text translations using data-i18n tags
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Update form inputs placeholders using data-i18n-placeholder
  const inputs = document.querySelectorAll('[data-i18n-placeholder]');
  inputs.forEach(input => {
    const key = input.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      input.setAttribute('placeholder', TRANSLATIONS[lang][key]);
    }
  });

  // Update selected option in visual lang buttons
  const langBtnText = document.getElementById('current-lang-text');
  if (langBtnText) {
    langBtnText.textContent = lang.toUpperCase();
  }

  // Active state for dropdown selections
  const options = document.querySelectorAll('.lang-option');
  options.forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.style.fontWeight = '700';
      opt.style.color = 'var(--color-gold-light)';
    } else {
      opt.style.fontWeight = 'normal';
      opt.style.color = 'var(--color-bone-cream)';
    }
  });

  // Trigger any sub-component update functions if they exist (e.g. Booking table)
  if (typeof updateDynamicPrices === 'function') {
    updateDynamicPrices();
  }

  // Update Services Page WhatsApp Links dynamically
  updateServicesWhatsAppLinks(lang);
}

function updateServicesWhatsAppLinks(lang) {
  const btnAirport = document.getElementById('btn-service-airport');
  const btnChauffeur = document.getElementById('btn-service-chauffeur');
  const btnMosque = document.getElementById('btn-service-mosque');
  const btnEvents = document.getElementById('btn-service-events');
  const btnRouteReserve = document.getElementById('btn-route-reserve');
  const btnHeroReserve = document.getElementById('btn-hero-reserve');
  const btnFaqWhatsapp = document.getElementById('btn-faq-whatsapp');
  
  const phone = '529842190001';
  
  const messages = {
    es: {
      airport: "Hola Salam Transfers, me interesa cotizar un *Traslado al Aeropuerto*. Estos son los detalles de mi viaje:\n\n• *Tipo de viaje:* (Ej: Solo ida / Viaje redondo)\n• *Origen / Hotel:*\n• *Destino / Hotel:*\n• *Fecha del servicio:*\n• *Hora de recogida:*\n• *Aerolínea y Número de vuelo:*\n• *Número de Pasajeros:* (Ej: 4 adultos y 1 niño)\n• *Cantidad de Equipaje:* (Ej: 3 maletas grandes)\n\n¿Me podrían apoyar con la cotización? ¡Gracias!",
      chauffeur: "Hola Salam Transfers, me interesa el servicio de *Chofer Privado por Día*. Aquí está mi plan estimado:\n\n• *Fecha del servicio:*\n• *Hora de inicio:*\n• *Modalidad:* (Ej: Medio día - 5h / Día completo - 10h / Por horas)\n• *Punto de recogida:*\n• *Destinos o actividades planeadas:* (Ej: Tour a Chichén Itzá / Shopping)\n• *Número de Pasajeros:*\n\nQuedo atento a su cotización para programar mi itinerario. ¡Gracias!",
      mosque: "Hola Salam Transfers, requiero un servicio dedicado de *Transportación a la Mezquita*. Estos son los datos de mi visita:\n\n• *Mezquita de destino:* (Ej: Masjid Al-Rahim en Cancún / Masjid Al-Rahman en Playa del Carmen)\n• *Modalidad:* (Ej: Viaje redondo con espera durante la oración / Solo ida)\n• *Fecha del servicio:*\n• *Hora de salida desde el hotel:*\n• *Tipo de oración:* (Ej: Salat al-Jumu'ah - Oración del viernes / Isha)\n• *Número de Pasajeros:*\n\nAgradezco su atención y respeto a nuestros tiempos de oración. Quedo atento.",
      events: "Hola Salam Transfers, me gustaría solicitar una cotización personalizada para un *Evento o Boda*. Estos son los datos iniciales de la logística:\n\n• *Tipo de evento:* (Ej: Boda de destino / Conferencia / Retiro)\n• *Fecha o fechas del evento:*\n• *Número estimado de invitados:*\n• *Servicios requeridos:* (Ej: Traslado de invitados desde el aeropuerto / Camioneta exclusiva para los novios)\n\nPor favor, pónganse en contacto conmigo para conocer los detalles. ¡Muchas gracias!",
      routeReserve: "Hola Salam Transfers, me interesa confirmar una reserva con la siguiente tarifa:\n• Origen:\n• Destino:\n• Tipo de Vehículo: (Ej: Hasta 6 personas / Hasta 11 personas)\n• Precio consultado: $ MXN\n• Anticipo de reserva: $ MXN\n• Fecha del viaje:\n• Hora estimada:\n\n¿Me podrían confirmar disponibilidad para esta fecha y proporcionarme el método para el pago del anticipo? ¡Muchas gracias!",
      heroReserve: "Hola Salam Transfers, me gustaría solicitar una cotización para un servicio de transportación. Aquí están mis datos:\nServicio:\nOrigen:\nDestino:\nFecha y Hora:\nPasajeros:\nEquipaje:\nQuedo a la espera de recibir mi cotización.",
      faqWhatsapp: "Hola Salam Transfers, tengo una pregunta o una solicitud especial con respecto a mi próximo viaje a la Riviera Maya. ¿Podría ayudarme un agente? ¡Gracias!"
    },
    en: {
      airport: "Hello Salam Transfers, I would like to request a quote for an *Airport Transfer*. Here are my travel details:\n\n• *Trip Type:* (e.g., One-way / Round-trip)\n• *Origin / Hotel:*\n• *Destination / Hotel:*\n• *Service Date:*\n• *Pickup Time:*\n• *Airline & Flight Number:*\n• *Number of Passengers:* (e.g., 4 adults and 1 child)\n• *Amount of Luggage:* (e.g., 3 large suitcases)\n\nCould you please provide a quote? Thank you!",
      chauffeur: "Hello Salam Transfers, I am interested in booking a *Private Chauffeur per Day*. Here is my estimated itinerary:\n\n• *Service Date:*\n• *Start Time:*\n• *Duration Option:* (e.g., Half-Day - 5h / Full-Day - 10h / Hourly)\n• *Pickup Location:*\n• *Planned Destinations/Activities:* (e.g., Chichen Itza Tour / Shopping)\n• *Number of Passengers:*\n\nI look forward to your quote to schedule my itinerary. Thank you!",
      mosque: "Hello Salam Transfers, I require a dedicated *Mosque Transportation* service. Here are my visit details:\n\n• *Destination Mosque:* (e.g., Masjid Al-Rahim in Cancun / Masjid Al-Rahman in Playa del Carmen)\n• *Service Option:* (e.g., Round-trip with waiting time during prayer / One-way)\n• *Service Date:*\n• *Pickup Time from Hotel:*\n• *Prayer Type:* (e.g., Salat al-Jumu'ah - Friday Prayer / Isha)\n• *Number of Passengers:*\n\nThank you for your attention and respect toward our prayer times. I look forward to your reply.",
      events: "Hello Salam Transfers, I would like to request a customized quote for an *Event or Wedding*. Here are the initial logistics details:\n\n• *Event Type:* (e.g., Destination Wedding / Conference / Retreat)\n• *Event Date(s):*\n• *Estimated Number of Guests:*\n• *Required Services:* (e.g., Guest airport shuttle / Exclusive van for the bride and groom)\n\nPlease contact me to coordinate the specific details. Thank you very much!",
      routeReserve: "Hello Salam Transfers, I reviewed the *Routes and Prices* table on your website and I would like to confirm a booking with the following fixed rate:\n\n• *Origin:*\n• *Destination:*\n• *Vehicle Type:* (e.g., Up to 6 people / Up to 11 people)\n• *Price Viewed:* $ MXN\n• *Booking Deposit:* $ MXN\n\n• *Travel Date:*\n• *Estimated Time:*\n\nCould you please confirm availability for this date and let me know how to pay the deposit? Thank you very much!",
      heroReserve: "Hello Salam Transfers, I would like to request a quote for a transportation service. Here are my details:\nService:\nOrigin:\nDestination:\nDate and Time:\nPassengers:\nLuggage:\nI look forward to receiving my quote.",
      faqWhatsapp: "Hello Salam Transfers, I have a question or a special request regarding my upcoming trip to the Riviera Maya. Could an agent please assist me? Thank you!"
    },
    fr: {
      airport: "Bonjour Salam Transfers, je souhaite obtenir un devis pour un *Transfert Aéroport*. Voici les détails de mon voyage:\n\n• *Type de voyage:* (Ex: Aller simple / Retour)\n• *Origine / Hôtel:*\n• *Destination / Hôtel:*\n• *Date du service:*\n• *Heure de prise en charge:*\n• *Compagnie aérienne & Numéro de vol:*\n• *Nombre de passagers:* (Ex: 4 adultes et 1 enfant)\n• *Nombre de bagages:* (Ex: 3 grands bagages)\n\nPouvez-vous m'aider avec un devis? Merci!",
      chauffeur: "Bonjour Salam Transfers, je suis intéressé par le service de *Chauffeur Privé à la Journée*. Voici mon plan estimatif:\n\n• *Date du service:*\n• *Heure de début:*\n• *Durée:* (Ex: Demi-journée - 5h / Journée entière - 10h / Horaire)\n• *Lieu de prise en charge:*\n• *Destinations ou activités prévues:* (Ex: Tour à Chichén Itzá / Shopping)\n• *Nombre de passagers:*\n\nJ'attends votre devis avec impatience pour planifier mon itinéraire. Merci!",
      mosque: "Bonjour Salam Transfers, j'ai besoin d'un service dédié de *Transport vers la Mosquée*. Voici les détails de ma visite:\n\n• *Mosquée de destination:* (Ex: Masjid Al-Rahim à Cancún / Masjid Al-Rahman à Playa du Carmen)\n• *Type:* (Ex: Aller-retour avec attente pendant la prière / Aller simple)\n• *Date du service:*\n• *Heure de départ de l'hôtel:*\n• *Type de prière:* (Ex: Salat al-Jumu'ah - Prière du vendredi / Isha)\n• *Nombre de passagers:*\n\nMerci pour votre attention et votre respect pour nos temps de prière. j'attends votre retour.",
      events: "Bonjour Salam Transfers, je souhaite demander un devis personnalisé pour un *Événement ou un Mariage*. Voici les premières informations logistiques:\n\n• *Type d'événement:* (Ex: Mariage à destination / Conférence / Retraite)\n• *Date(s) de l'événement:*\n• *Nombre estimé d'invités:*\n• *Services requis:* (Ex: Transfert d'invités depuis l'aéroport / Camionnette exclusive pour les mariés)\n\nVeuillez me contacter pour discuter des détails. Merci beaucoup!",
      routeReserve: "Bonjour Salam Transfers, je souhaite confirmer une réservation avec le tarif suivant:\n• Origine:\n• Destination:\n• Type de véhicule: (Ex: Jusqu'à 6 personnes / Jusqu'à 11 personnes)\n• Tarif consulté: $ MXN\n• Acompte de réservation: $ MXN\n• Date du voyage:\n• Heure estimée:\n\nPourriez-vous me confirmer la disponibilité pour cette date et me fournir le moyen de payer l'acompte? Merci beaucoup!",
      heroReserve: "Bonjour Salam Transfers, je souhaite demander un devis pour un service de transport. Voici mes coordonnées :\nService :\nOrigine :\nDestination :\nDate et Heure :\nPassagers :\nBagages :\nDans l'attente de recevoir mon devis.",
      faqWhatsapp: "Bonjour Salam Transfers, j'ai une question ou une demande spéciale concernant mon prochain voyage sur la Riviera Maya. Un agent pourrait-il m'aider? Merci!"
    },
    ar: {
      airport: "مرحباً سلام ترانسفيرز، أود الحصول على تسعيرة لخدمة *التوصيل من وإلى المطار*. تفاصيل رحلتي كالتالي:\n\n• *نوع الرحلة:* (مثال: ذهاب فقط / ذهاب وعودة)\n• *مكان الانطلاق / الفندق:*\n• *الوجهة / الفندق:*\n• *تاريخ الخدمة:*\n• *وقت الالتقاء:*\n• *شركة الطيران ورقم الرحلة:*\n• *عدد الركاب:* (مثال: 4 بالغين وطفل واحد)\n• *كمية الأمتعة:* (مثال: 3 حقائب كبيرة)\n\nهل يمكنكم مساعدتي في الحصول على تسعيرة؟ شكراً لكم!",
      chauffeur: "مرحباً سلام ترانسفيرز، أنا مهتم بخدمة *سائق خاص لليوم*. إليك خطتي التقديرية:\n\n• *تاريخ الخدمة:*\n• *وقت البدء:*\n• *المدة:* (مثال: نصف يوم - 5 ساعات / يوم كامل - 10 ساعات / بالساعة)\n• *مكان الانطلاق:*\n• *الوجهات أو الأنشطة المخطط لها:* (مثال: جولة في تشيتشن إيتزا / تسوق)\n• *عدد الركاب:*\n\nأنا بانتظار عرض السعر لتنظيم مسار رحلتي. شكراً لكم!",
      mosque: "مرحباً سلام ترانسفيرز، أحتاج لخدمة مخصصة لـ *النقل إلى المسجد*. تفاصيل زيارتي كالتالي:\n\n• *المسجد المستهدف:* (مثال: مسجد الرحيم في كانكون / مسجد الرحمن في بلايا ديل كارمن)\n• *النوع:* (مثال: ذهاب وعودة مع الانتظار أثناء الصلاة / ذهاب فقط)\n• *تاريخ الخدمة:*\n• *وقت المغادرة من الفندق:*\n• *نوع الصلاة:* (مثال: صلاة الجمعة / العشاء)\n• *عدد الركاب:*\n\nنشكر اهتمامكم واحترامكم لأوقات صلاتنا. أنا بانتظار ردكم.",
      events: "مرحباً سلام ترانسفيرز، أود طلب عرض سعر مخصص لـ *مناسبة أو حفل زفاف*. إليك البيانات اللوجستية الأولية:\n\n• *نوع المناسبة:* (مثال: حفل زفاف / مؤتمر / تراجع)\n• *تاريخ أو تواريخ المناسبة:*\n• *العدد التقديري للضيوف:*\n• *الخدمات المطلوبة:* (مثال: نقل الضيوف من المطار / حافلة مخصصة للعروسين)\n\nيرجى التواصل معي لمناقشة التفاصيل. شكراً جزيلاً!",
      routeReserve: "مرحباً سلام ترانسفيرز، أود تأكيد حجز بالتعرفة التالية:\n• نقطة الانطلاق:\n• الوجهة:\n• نوع المركبة: (مثال: حتى 6 أشخاص / حتى 11 شخصاً)\n• السعر المستعلم عنه: $ بيزو مكسيكي\n• الدفعة المقدمة للحجز: $ بيزو مكسيكي\n• تاريخ الرحلة:\n• الوقت المقدر:\n\nهل يمكنكم تأكيد التوفر في هذا التاريخ وتزويدي بطريقة دفع الدفعة المقدمة؟ شكراً جزيلاً!",
      heroReserve: "مرحباً سلام ترانسفيرز، أود طلب عرض سعر لخدمة نقل. إليك تفاصيلي:\nالخدمة:\nنقطة الانطلاق:\nالوجهة:\nالتاريخ والوقت:\nعدد الركاب:\nالأمتعة:\nبانتظار تلقي عرض السعر الخاص بي.",
      faqWhatsapp: "مرحباً سلام ترانسفيرز، لدي سؤال أو طلب خاص بخصوص رحلتي القادمة إلى ريفييرا مايا. هل يمكن لأحد الوكلاء مساعدتي؟ شكراً لكم!"
    }
  };
  
  const currentLang = lang || 'es';
  const selectedMsgs = messages[currentLang] || messages['es'];
  
  if (btnAirport) btnAirport.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.airport)}`);
  if (btnChauffeur) btnChauffeur.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.chauffeur)}`);
  if (btnMosque) btnMosque.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.mosque)}`);
  if (btnEvents) btnEvents.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.events)}`);
  if (btnRouteReserve) btnRouteReserve.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.routeReserve)}`);
  if (btnHeroReserve) btnHeroReserve.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.heroReserve)}`);
  if (btnFaqWhatsapp) btnFaqWhatsapp.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.faqWhatsapp)}`);

  // Dynamically intercept all links to booking.html on any page and route them to WhatsApp
  const bookingLinks = document.querySelectorAll('a[href^="booking.html"], a[data-original-href^="booking.html"]');
  bookingLinks.forEach(link => {
    let href = link.getAttribute('data-original-href');
    if (!href) {
      href = link.getAttribute('href') || '';
      link.setAttribute('data-original-href', href);
    }
    
    if (href.includes('service=mosque')) {
      link.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.mosque)}`);
    } else if (href.includes('service=chauffeur')) {
      link.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.chauffeur)}`);
    } else if (href.includes('service=events')) {
      link.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.events)}`);
    } else {
      link.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(selectedMsgs.heroReserve)}`);
    }
  });
}

function updateVehicleCardUI(val) {
  const cardSienna = document.getElementById('vehicle-card-sienna');
  const cardHiace = document.getElementById('vehicle-card-hiace');
  if (cardSienna && cardHiace) {
    if (val <= 6) {
      cardSienna.classList.add('active');
      cardSienna.style.borderColor = 'var(--color-gold-matte)';
      cardHiace.classList.remove('active');
      cardHiace.style.borderColor = 'rgba(151, 134, 100, 0.1)';
    } else {
      cardHiace.classList.add('active');
      cardHiace.style.borderColor = 'var(--color-gold-matte)';
      cardSienna.classList.remove('active');
      cardSienna.style.borderColor = 'rgba(151, 134, 100, 0.1)';
    }
  }
}

// --- Common DOM Interactions ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Initialization
  const currentLang = getLanguage();
  updatePageLanguage(currentLang);
  maybeShowLanguageHint();

  // Language Dropdown toggles
  const langBtn = document.getElementById('lang-selector-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('active');
    });

    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedLang = opt.getAttribute('data-lang');
        setLanguage(selectedLang);
        langDropdown.classList.remove('active');
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
    });
  }

  // 4. FAQ Accordion Toggle Actions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Shared Contact Form Submission Mock
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name-input').value;
      const email = document.getElementById('contact-email-input').value;
      const message = document.getElementById('contact-msg-input').value;
      
      if (!name || !email || !message) {
        alert(currentLang === 'es' ? 'Por favor completa todos los campos' : 'Please fill all required fields');
        return;
      }
      
      const successMsg = currentLang === 'es' 
        ? '¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo en breve.' 
        : 'Thank you! Your message has been sent successfully. We will contact you shortly.';
      alert(successMsg);
      contactForm.reset();
    });
  }

  // 6. WhatsApp Floating Bubble click mapping
  const waBubble = document.getElementById('whatsapp-bubble');
  if (waBubble) {
    waBubble.addEventListener('click', () => {
      const lang = getLanguage();
      const text = encodeURIComponent(TRANSLATIONS[lang].whatsapp_text);
      // Link to WhatsApp with formatted message
      window.open(`https://wa.me/529842190001?text=${text}`, '_blank');
    });
  }

  // 7. Booking Page Wizard Initialization
  initBookingWizard();
});

// --- Dynamic Booking Wizard Logic ---
let wizardCurrentStep = 1;
let selectedService = 'airport';
let selectedRouteCode = 'cancun-hz';
let paxCount = 1;
let luggageCount = 1;
let chauffeurHours = 4;
let finalPriceTotal = 0;
let finalPriceDeposit = 0;
let finalPriceBalance = 0;

function initBookingWizard() {
  const bookingPage = document.getElementById('booking-wizard-page-indicator');
  if (!bookingPage) return; // Only run on booking page

  // Check URL parameters for preselected route
  const urlParams = new URLSearchParams(window.location.search);
  const preRoute = urlParams.get('route');
  if (preRoute && PRICING_CONFIG.routes[preRoute]) {
    selectedRouteCode = preRoute;
    const routeSelect = document.getElementById('booking-route-select');
    if (routeSelect) routeSelect.value = preRoute;
  }
  const preService = urlParams.get('service');
  if (preService && ['airport', 'chauffeur', 'mosque', 'events'].includes(preService)) {
    selectedService = preService;
    const serviceSelect = document.getElementById('booking-service-type');
    if (serviceSelect) serviceSelect.value = preService;
  }

  updateWizardFieldsVisibility();
  updateWizardStepsUI();

  // Event Listeners for inputs
  const serviceSelect = document.getElementById('booking-service-type');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
      selectedService = e.target.value;
      updateWizardFieldsVisibility();
      calculateBookingPrices();
    });
  }

  const routeSelect = document.getElementById('booking-route-select');
  if (routeSelect) {
    routeSelect.addEventListener('change', (e) => {
      selectedRouteCode = e.target.value;
      calculateBookingPrices();
    });
  }

  // Chauffeur Hours
  const hrsInput = document.getElementById('booking-hours-input');
  if (hrsInput) {
    hrsInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value) || 4;
      if (val < 4) val = 4;
      chauffeurHours = val;
      calculateBookingPrices();
    });
  }

  // Counters Passenger and Luggage
  setupCounter('pax-dec', 'pax-inc', 'pax-value', (val) => {
    paxCount = val;
    // Show warn if exceeds capacities
    const warning = document.getElementById('pax-capacity-warning');
    if (warning) {
      if (paxCount > 11) {
        warning.style.display = 'block';
        warning.textContent = getLanguage() === 'es' 
          ? '⚠️ Capacidad máxima excedida (Máximo 11 pasajeros por camioneta).' 
          : '⚠️ Maximum capacity exceeded (Max 11 passengers per van).';
      } else {
        warning.style.display = 'none';
      }
    }
    // Sync vehicle cards
    updateVehicleCardUI(val);
    calculateBookingPrices();
  }, 1, 15);

  // Initialize vehicle card UI state
  updateVehicleCardUI(paxCount);

  // Add click listeners to vehicle cards
  const cardSienna = document.getElementById('vehicle-card-sienna');
  const cardHiace = document.getElementById('vehicle-card-hiace');
  if (cardSienna && cardHiace) {
    cardSienna.addEventListener('click', () => {
      if (paxCount > 6) {
        paxCount = 6;
        const paxVal = document.getElementById('pax-value');
        if (paxVal) paxVal.textContent = paxCount;
        const warning = document.getElementById('pax-capacity-warning');
        if (warning) warning.style.display = 'none';
      }
      updateVehicleCardUI(paxCount);
      calculateBookingPrices();
    });

    cardHiace.addEventListener('click', () => {
      if (paxCount <= 6) {
        paxCount = 7;
        const paxVal = document.getElementById('pax-value');
        if (paxVal) paxVal.textContent = paxCount;
      }
      updateVehicleCardUI(paxCount);
      calculateBookingPrices();
    });
  }

  setupCounter('lug-dec', 'lug-inc', 'lug-value', (val) => {
    luggageCount = val;
  }, 0, 20);

  // Navigation buttons
  const btnNext = document.getElementById('wizard-btn-next');
  const btnBack = document.getElementById('wizard-btn-back');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (validateStep(wizardCurrentStep)) {
        if (wizardCurrentStep === 3) {
          // Final Confirmation step simulated payout
          processMockPaymentAndProceed();
        } else {
          wizardCurrentStep++;
          updateWizardStepsUI();
        }
      }
    });
  }

  if (btnBack) {
    btnBack.addEventListener('click', () => {
      if (wizardCurrentStep > 1) {
        wizardCurrentStep--;
        updateWizardStepsUI();
      }
    });
  }

  // Initial pricing calculate
  calculateBookingPrices();
}

function setupCounter(decId, incId, valId, callback, min = 1, max = 15) {
  const decBtn = document.getElementById(decId);
  const incBtn = document.getElementById(incId);
  const valText = document.getElementById(valId);
  if (!decBtn || !incBtn || !valText) return;

  let currentVal = parseInt(valText.textContent) || min;

  decBtn.addEventListener('click', () => {
    if (currentVal > min) {
      currentVal--;
      valText.textContent = currentVal;
      callback(currentVal);
    }
  });

  incBtn.addEventListener('click', () => {
    if (currentVal < max) {
      currentVal++;
      valText.textContent = currentVal;
      callback(currentVal);
    }
  });
}

function updateWizardFieldsVisibility() {
  const rowAirport = document.getElementById('field-group-airport');
  const rowChauffeur = document.getElementById('field-group-chauffeur');
  const rowMosque = document.getElementById('field-group-mosque');

  if (!rowAirport || !rowChauffeur || !rowMosque) return;

  // Hide all first
  rowAirport.style.display = 'none';
  rowChauffeur.style.display = 'none';
  rowMosque.style.display = 'none';

  if (selectedService === 'airport') {
    rowAirport.style.display = 'block';
  } else if (selectedService === 'chauffeur') {
    rowChauffeur.style.display = 'block';
  } else if (selectedService === 'mosque') {
    rowMosque.style.display = 'block';
  }
}

function calculateBookingPrices() {
  let total = 0;
  let deposit = 0;

  // 1. Evaluate pricing based on capacity tier
  const capacityTier = paxCount <= 6 ? 'price6' : 'price11';

  if (selectedService === 'airport') {
    const route = PRICING_CONFIG.routes[selectedRouteCode];
    if (route) {
      total = capacityTier === 'price6' ? route.price6 : route.price11;
      deposit = route.deposit;
    }
  } else if (selectedService === 'chauffeur') {
    // Total = Hours * rate. (11 pax hiace gets a premium surcharge of 40%)
    const baseHourRate = PRICING_CONFIG.chauffeur.pricePerHour;
    const hourRate = capacityTier === 'price6' ? baseHourRate : baseHourRate * 1.4;
    total = hourRate * chauffeurHours;
    deposit = Math.round(total * PRICING_CONFIG.chauffeur.depositPercent);
  } else if (selectedService === 'mosque') {
    // Fixed mosque service
    total = capacityTier === 'price6' ? PRICING_CONFIG.mosque.fixedPrice : PRICING_CONFIG.mosque.fixedPrice * 1.5;
    deposit = PRICING_CONFIG.mosque.deposit;
  } else if (selectedService === 'events') {
    total = capacityTier === 'price6' ? PRICING_CONFIG.event.fixedPrice : PRICING_CONFIG.event.fixedPrice * 1.6;
    deposit = PRICING_CONFIG.event.deposit;
  }

  finalPriceTotal = total;
  finalPriceDeposit = deposit;
  finalPriceBalance = total - deposit;

  // Update DOM summary fields
  updateDOMPricingFields();
}

function updateDOMPricingFields() {
  const totalFields = document.querySelectorAll('.val-quote-total');
  const depositFields = document.querySelectorAll('.val-quote-deposit');
  const balanceFields = document.querySelectorAll('.val-quote-balance');

  totalFields.forEach(f => f.textContent = `$${finalPriceTotal.toLocaleString()} MXN`);
  depositFields.forEach(f => f.textContent = `$${finalPriceDeposit.toLocaleString()} MXN`);
  balanceFields.forEach(f => f.textContent = `$${finalPriceBalance.toLocaleString()} MXN`);
}

function validateStep(step) {
  const currentLang = getLanguage();
  if (step === 1) {
    // Validate Contact Data & Input fields
    const nameInput = document.getElementById('book-contact-name');
    const emailInput = document.getElementById('book-contact-email');
    const phoneInput = document.getElementById('book-contact-phone');
    
    if (!nameInput || !emailInput || !phoneInput) return false;
    
    if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim()) {
      alert(currentLang === 'es' ? 'Por favor completa todos tus datos personales' : 'Please fill all your personal details');
      return false;
    }

    if (paxCount > 11) {
      alert(currentLang === 'es' 
        ? 'El límite máximo es de 11 pasajeros por unidad. Si es un grupo mayor, contáctanos directamente.' 
        : 'The maximum limit is 11 passengers per vehicle. For larger groups, contact us directly.');
      return false;
    }
    
    // Validate specific service requirements
    if (selectedService === 'airport') {
      const flightInput = document.getElementById('book-flight-num');
      if (flightInput && !flightInput.value.trim()) {
        alert(currentLang === 'es' ? 'Por favor proporciona tu número de vuelo' : 'Please provide your flight number');
        return false;
      }
    }
  } else if (step === 3) {
    // Validate payment inputs
    const cardNum = document.getElementById('stripe-card-num');
    const cardExpiry = document.getElementById('stripe-card-expiry');
    const cardCvv = document.getElementById('stripe-card-cvv');
    const cardName = document.getElementById('stripe-card-name');

    if (!cardNum.value || !cardExpiry.value || !cardCvv.value || !cardName.value) {
      alert(currentLang === 'es' ? 'Por favor completa los detalles del pago con tarjeta' : 'Please complete card payment details');
      return false;
    }
  }
  return true;
}

function updateWizardStepsUI() {
  const steps = document.querySelectorAll('.wizard-step');
  steps.forEach((step, idx) => {
    if (idx + 1 === wizardCurrentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Nodes active
  const nodes = document.querySelectorAll('.step-node');
  nodes.forEach((node, idx) => {
    const nodeStep = idx + 1;
    node.classList.remove('active', 'completed');
    if (nodeStep === wizardCurrentStep) {
      node.classList.add('active');
    } else if (nodeStep < wizardCurrentStep) {
      node.classList.add('completed');
      node.innerHTML = '<i class="fa-solid fa-check"></i>';
    } else {
      node.innerHTML = nodeStep;
    }
  });

  // Update progress line width
  const progressBar = document.getElementById('step-progress-bar');
  if (progressBar) {
    const percent = ((wizardCurrentStep - 1) / (nodes.length - 1)) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Update Navigation buttons
  const btnNext = document.getElementById('wizard-btn-next');
  const btnBack = document.getElementById('wizard-btn-back');

  if (btnNext && btnBack) {
    if (wizardCurrentStep === 4) {
      // Hide all navigations in final screen
      btnNext.style.display = 'none';
      btnBack.style.display = 'none';
    } else {
      btnNext.style.display = 'inline-flex';
      btnBack.style.display = wizardCurrentStep === 1 ? 'none' : 'inline-flex';

      const currentLang = getLanguage();
      // If payment step 3, next button is "Confirm & Pay"
      if (wizardCurrentStep === 3) {
        btnNext.textContent = TRANSLATIONS[currentLang].btn_confirm;
      } else {
        btnNext.textContent = TRANSLATIONS[currentLang].btn_next;
      }
      btnBack.textContent = TRANSLATIONS[currentLang].btn_back;
    }
  }
}

function processMockPaymentAndProceed() {
  const btnNext = document.getElementById('wizard-btn-next');
  const currentLang = getLanguage();
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.textContent = currentLang === 'es' ? 'Procesando...' : 'Processing...';
  }

  // Mock a Stripe API network call delaying for 1.5 seconds
  setTimeout(() => {
    if (btnNext) btnNext.disabled = false;
    
    // 1. Generate Mock Confirmation Details
    const randomCode = `SLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const driverList = ['Farooq Al-Jamil', 'Omar Mendoza', 'Tariq Ben-Salem', 'Ameer Rahman'];
    const selectedDriver = driverList[Math.floor(Math.random() * driverList.length)];
    const plates = `QR-${Math.floor(100 + Math.random() * 900)}-K`;
    const vehicle = paxCount <= 6 ? 'Toyota Sienna Hybrid (Premium)' : 'Toyota HiAce Executive';

    // 2. Render confirmation fields
    const resCode = document.getElementById('confirm-reservation-code');
    const drName = document.getElementById('confirm-driver-name');
    const drCar = document.getElementById('confirm-driver-car');
    const drPlates = document.getElementById('confirm-driver-plate');

    if (resCode) resCode.textContent = randomCode;
    if (drName) drName.textContent = selectedDriver;
    if (drCar) drCar.textContent = vehicle;
    if (drPlates) drPlates.textContent = plates;

    // 3. Setup dynamic WhatsApp confirmation link
    const waConfirmBtn = document.getElementById('confirm-whatsapp-btn');
    if (waConfirmBtn) {
      waConfirmBtn.addEventListener('click', () => {
        let msg = '';
        if (currentLang === 'es') {
          msg = `Hola Salam Transfers, acabo de confirmar mi reservación ${randomCode}. Detalle: Servicio ${selectedService} para ${paxCount} personas. Saldo restante a pagar al chofer: $${finalPriceBalance.toLocaleString()} MXN. ¡Nos vemos pronto!`;
        } else {
          msg = `Hello Salam Transfers, I just confirmed my booking ${randomCode}. Details: Service ${selectedService} for ${paxCount} passengers. Remaining balance to pay driver: $${finalPriceBalance.toLocaleString()} MXN. See you soon!`;
        }
        window.open(`https://wa.me/529842190001?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }

    // Proceed to Step 4 success screen
    wizardCurrentStep = 4;
    updateWizardStepsUI();
  }, 1500);
}
