/**
 * crmIntegration.ts
 * 
 * Módulo de integración con el CRM de Roesan.
 * Al completar un formulario de cotización en el sitio web, este módulo
 * crea simultáneamente un Lead y una Tarea de cotización en el CRM.
 * 
 * CRMREAL App ID: f25fbd1b-5972-4053-9a45-438934a9fd7a
 */

import { init, tx, id } from '@instantdb/core';

// Conexión exclusiva al CRM de Roesan
// Importante: No mover a variables de entorno para evitar problemas de resolución en el cliente
const crmDb = init({ appId: 'f25fbd1b-5972-4053-9a45-438934a9fd7a' });

interface LeadPayload {
  nombre: string;
  lastName?: string;
  telefono?: string;
  email?: string;
  notas?: string;              // texto completo de observaciones/notas
  observaciones?: string;      // mensaje libre del usuario
  type?: string;
  customerType?: string;
  selectedProducts?: string;   // label legible de los ramos seleccionados
  vehiclePlate?: string;
  documento?: string;          // cédula conductora
  companyName?: string;
  companyNit?: string;
  responsibleName?: string;
  responsiblePhone?: string;
  driverBirthDate?: string;
  hasPledge?: boolean;
  pledgeDetails?: string;
  drivingZone?: string;
  pipeline_tipo?: string;
}

/**
 * Envía un lead capturado en el sitio web al CRM de Roesan.
 * Crea el registro del Lead en el pipeline y genera automáticamente
 * una Tarea de cotización asociada.
 */
export async function enviarLeadAlCRM(payload: LeadPayload): Promise<boolean> {
  const { 
    nombre, 
    lastName,
    telefono, 
    email, 
    notas,
    observaciones,
    type,
    customerType,
    selectedProducts,
    vehiclePlate,
    documento,
    companyName,
    companyNit,
    responsibleName,
    responsiblePhone,
    driverBirthDate,
    hasPledge,
    pledgeDetails,
    drivingZone,
    pipeline_tipo,
  } = payload;
  
  const newLeadId = id();
  const interactionId = id();
  const now = Date.now();
  const automaticCreator = 'Sitio web de Roesan';

  try {
    await crmDb.transact([
      // 1. Crear el registro del Lead en el Pipeline
      tx.leads[newLeadId].update({
        name: nombre,
        lastName: lastName || '',
        phone: telefono || '',
        email: email || '',
        source: 'Sitio Web',
        status: 'Nuevos',
        pipeline_tipo: pipeline_tipo || 'preventa',
        priority: 'Media',
        score: 0,
        notes: notas || '',
        observaciones: observaciones || '',
        createdBy: automaticCreator,
        createdByEmail: '',
        creationOrigin: 'sitio_web',
        createdAt: now,
        updatedAt: now,
        // Ramo / tipo de seguro
        type: type || 'persona',
        customerType: customerType || 'persona',
        selectedProducts: selectedProducts || '',
        // Datos vehículo
        vehiclePlate: vehiclePlate || '',
        hasPledge: hasPledge ?? false,
        pledgeDetails: pledgeDetails || '',
        drivingZone: drivingZone || '',
        // Datos personales
        documento: documento || '',
        driverBirthDate: driverBirthDate || '',
        // Datos empresa
        companyName: companyName || '',
        companyNit: companyNit || '',
        responsibleName: responsibleName || '',
        responsiblePhone: responsiblePhone || '',
      }),

      // 2. Crear la Tarea / Ticket de Cotización asociada
      tx.tasks[id()].update({
        title: `Cotizar ${selectedProducts || type || 'seguro'}`,
        description: `Cotizar ${selectedProducts || type || 'seguro'} para: ${nombre}`,
        leadId: newLeadId,
        completed: false,
        createdAt: now,
      }),

      // 3. Registrar el origen automático en el timeline del Lead
      tx.interacciones[interactionId].update({
        leadId: newLeadId,
        tipo: 'creacion_lead',
        notas: 'Lead creado automáticamente desde el formulario del sitio web de Roesan.',
        createdBy: automaticCreator,
        metadata: { origin: 'sitio_web', source: 'Sitio Web' },
        createdAt: now,
      }),
      tx.interacciones[interactionId].link({ lead: newLeadId }),
    ]);

    console.log('✅ Lead y tarea enviados exitosamente al CRM de Roesan.');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar lead al CRM de Roesan:', error);
    return false;
  }
}
