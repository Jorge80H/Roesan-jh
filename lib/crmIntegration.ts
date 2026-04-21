/**
 * crmIntegration.ts
 * 
 * Módulo de integración con el CRM de Roesan.
 * Al completar un formulario de cotización en el sitio web, este módulo
 * crea simultáneamente un Lead y una Tarea de cotización en el CRM.
 * 
 * CRM App ID: a40fd164-ca68-4a1b-9a75-ed939ba947c6
 */

import { init, tx, id } from '@instantdb/core';

// Conexión exclusiva al CRM de Roesan
// Importante: No mover a variables de entorno para evitar problemas de resolución en el cliente
const crmDb = init({ appId: 'a40fd164-ca68-4a1b-9a75-ed939ba947c6' });

interface LeadPayload {
  nombre: string;
  lastName?: string;
  telefono?: string;
  email?: string;
  notas?: string;
  type?: string;
  customerType?: string;
  vehiclePlate?: string;
  companyName?: string;
  companyNit?: string;
  responsibleName?: string;
  driverBirthDate?: string;
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
    type,
    customerType,
    vehiclePlate,
    companyName,
    companyNit,
    responsibleName,
    driverBirthDate
  } = payload;
  
  const newLeadId = id();

  try {
    await crmDb.transact([
      // 1. Crear el registro del Lead en el Pipeline
      tx.leads[newLeadId].update({
        name: nombre,
        lastName: lastName || '',
        phone: telefono || '',
        email: email || '',
        source: 'Sitio Web',
        status: 'Nuevo',
        notes: notas || 'Lead capturado desde formulario web.',
        createdAt: Date.now(),
        // Campos técnicos mapeados
        type: type || 'persona',
        customerType: customerType || 'persona',
        vehiclePlate: vehiclePlate || '',
        companyName: companyName || '',
        companyNit: companyNit || '',
        responsibleName: responsibleName || '',
        driverBirthDate: driverBirthDate || '',
      }),

      // 2. Crear la Tarea / Ticket de Cotización asociada
      tx.tasks[id()].update({
        description: `Cotizar seguro (${type || 'general'}) para: ${nombre}`,
        leadId: newLeadId,
        completed: false,
        createdAt: Date.now(),
      }),
    ]);

    console.log('✅ Lead y tarea enviados exitosamente al CRM de Roesan.');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar lead al CRM de Roesan:', error);
    return false;
  }
}
