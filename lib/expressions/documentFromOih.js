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
'use strict';
const jsonata = require('jsonata');

module.exports.getExpression = msg => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }

  const rowids = msg.body.meta.recordUid;
  const lastModifications = (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v, $i, $a) { ($v.lastModified.timestamp != '') })`).evaluate());

  const expression = {
    "meta_data": {
      "prim_uid": rowids ? rowids : '',
      "company_uid": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.company_uid) ? msg.body.data.meta_data.company_uid : undefined,
      "last_update": lastModifications ? lastModifications.lastModified.timestamp : '',
      "document_number": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.document_number) ? msg.body.data.meta_data.document_number: undefined,
      "document_date": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.document_date) ? msg.body.data.meta_data.document_date : undefined,
      "document_due_date": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.document_due_date) ? msg.body.data.meta_data.document_due_date : undefined,
      "net_amount": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.net_amount) ? msg.body.data.meta_data.net_amount : undefined,
      "vat": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.vat) ? msg.body.data.meta_data.vat : undefined,
      "gross_amount": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.vat) ? msg.body.data.meta_data.gross_amount : undefined,
      "currency": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.currency) ? msg.body.data.meta_data.currency : undefined,
      "is_archived": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.is_archived) ? msg.body.data.meta_data.is_archived : undefined,
      "is_ocr_completed": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.is_ocr_completed) ? msg.body.data.meta_data.is_ocr_completed : undefined,
      "tags": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.tags) ? msg.body.data.meta_data.tags : undefined,
      "note": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.note) ? msg.body.data.meta_data.note : undefined,
      "source": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.source) ? msg.body.data.meta_data.source : undefined,
      "filename": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.filename) ? msg.body.data.meta_data.filename : undefined,
      "file_size": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.file_size) ? msg.body.data.meta_data.file_size : undefined,
      "payment_status": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.payment_status) ? msg.body.data.meta_data.payment_status : undefined,
      "payment_method": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.payment_method) ? msg.body.data.meta_data.payment_method : undefined,
      "attachments": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.attachments) ? msg.body.data.meta_data.attachments : undefined,
      "payment_details": {
          "card_number": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.payment_details.card_number) ? msg.body.data.meta_data.payment_details.card_number : undefined,
          "cash_discount_date": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.payment_details.cash_discount_date) ? msg.body.data.meta_data.payment_details.cash_discount_date : undefined,
          "cash_discount_value": (msg.body.data.meta_data!=undefined && msg.body.data.meta_data.payment_details.cash_discount_value) ? msg.body.data.meta_data.payment_details.cash_discount_value : undefined
      }
  },
  "file_content": msg.body.data.file_content ? msg.body.data.file_content : undefined
  };
  return expression;
};
