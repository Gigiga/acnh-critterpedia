/**
 * ACNH Critterpedia
 * REST interface to query Animal Crossing New Horizons creatures and fossils
 *
 * OpenAPI spec version: 0.1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export type Months =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC';

export const Months = {
  JAN: 'JAN' as Months,
  FEB: 'FEB' as Months,
  MAR: 'MAR' as Months,
  APR: 'APR' as Months,
  MAY: 'MAY' as Months,
  JUN: 'JUN' as Months,
  JUL: 'JUL' as Months,
  AUG: 'AUG' as Months,
  SEP: 'SEP' as Months,
  OCT: 'OCT' as Months,
  NOV: 'NOV' as Months,
  DEC: 'DEC' as Months,
};

export interface Month {
  name: Months;
}
