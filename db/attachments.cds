using { ust.harika as my } from './model';
using { Attachments } from '@cap-js/sdm';

extend my.RequestHeaders with { attachments: Composition of many Attachments }