/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type QuoteReport = {
  id?: string
  timestamp?: string
  version?: string
  isv_enclave_quote_status?: string
  platform_info_blob?: string
  isv_enclave_quote_body?: string
  advisory_ids?: string[]
}

export type QuoteReportBody = {
  mr_enclave?: string
  mr_signer?: string
  report_data?: string
}

export type QuoteReportData = {
  version?: string
  sign_type?: string
  report_body?: QuoteReportBody
}

export type EndorsedAttestationReport = {
  report?: Uint8Array
  signature?: Uint8Array
  signing_cert?: Uint8Array
}

export type SGXEC256Signature = {
  gx?: string
  gy?: string
}

export type PlatformInfoBlob = {
  sgx_epid_group_flags?: number
  sgx_tcb_evaluation_flags?: number
  pse_evaluation_flags?: number
  latest_equivalent_tcb_psvn?: string
  latest_pse_isvsvn?: string
  latest_psda_svn?: string
  xeid?: number
  gid?: number
  sgx_ec256_signature_t?: SGXEC256Signature
}