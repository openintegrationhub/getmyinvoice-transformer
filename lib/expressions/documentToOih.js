/**
 * Copyright GetMyInvoices

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const jsonata = require('jsonata');

module.exports.getExpression = msg => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }
  const expression = {
    meta: {
      recordUid: msg.body.meta.recordUid,
      applicationUid: (msg.body.meta.applicationUid!=undefined && msg.body.meta.applicationUid!=null) ? msg.body.meta.applicationUid : 'appUid not set yet',
      iamToken: (msg.body.meta.iamToken!=undefined && msg.body.meta.iamToken!=null) ? msg.body.meta.iamToken : 'iamToken not set yet',
      lastModification: {
            type: 'created',
            timestamp: msg.body.data.created_at!=undefined ? msg.body.data.created_at : Date(Date.now()).toString()
      },
      domainId: 'TO BE ADDED',
      schemaURI: 'TO BE ADDED'
    },
    data: {
      meta_data: {
        company_uid: msg.body.data.company_uid ? msg.body.data.company_uid : undefined,
        last_update: msg.body.data.last_update ?  msg.body.data.last_update : undefined,
        document_number: msg.body.data.document_number ? msg.body.data.document_number : undefined,
        document_date: msg.body.data.document_date ? msg.body.data.document_date : undefined,
        document_due_date: msg.body.data.document_due_date ? msg.body.data.document_due_date : undefined,
        net_amount: msg.body.data.net_amount ? msg.body.data.net_amount : undefined,
        vat: msg.body.data.vat ? msg.body.data.vat : undefined,
        gross_amount: msg.body.data.gross_amount ? msg.body.data.gross_amount : undefined,
        currency: msg.body.data.currency ? msg.body.data.currency : undefined,
        is_archived: msg.body.data.is_archived ? msg.body.data.is_archived : undefined,
        is_ocr_completed: msg.body.data.is_ocr_completed ? msg.body.data.is_ocr_completed : undefined,
        tags: msg.body.data.tags ? msg.body.data.tags : undefined,
        note: msg.body.data.note ? msg.body.data.note : undefined,
        source: msg.body.data.source ? msg.body.data.source : undefined,
        filename: msg.body.data.filename ? msg.body.data.filename : undefined,
        file_size: msg.body.data.file_size ? msg.body.data.file_size : undefined,
        payment_status: msg.body.data.payment_status ? msg.body.data.payment_status : undefined,
        payment_method: msg.body.data.payment_method ? msg.body.data.payment_method : undefined,
        attachments: msg.body.data.attachments ? msg.body.data.attachments : undefined,
        payment_details: {
            card_number: (msg.body.data.payment_details!=undefined && msg.body.data.payment_details.card_number!=undefined) ? msg.body.data.payment_details.card_number : undefined,
            cash_discount_date: (msg.body.data.payment_details!=undefined &&msg.body.data.payment_details.cash_discount_date!=undefined) ? msg.body.data.payment_details.cash_discount_date: undefined,
            cash_discount_value: (msg.body.data.payment_details!=undefined &&msg.body.data.payment_details.cash_discount_value!=undefined) ? msg.body.data.payment_details.cash_discount_value: undefined
        }
      },
      file_content: msg.body.data.file_content ? msg.body.data.file_content : undefined
    }
  };
  return expression;
};
