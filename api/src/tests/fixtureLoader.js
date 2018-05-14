const uuidByString = require('uuid-by-string');

const query = require('../db/client');
import { createUrgentAction as createUrgentActionBase } from '../urgentActions/repository';

export const createUrgentAction = async (urgentAction = {}) => createUrgentActionBase({
    title: "Commutation of William Montgomery's sentence",
    ...urgentAction,
    id: uuidByString(urgentAction.title || "Commutation of William Montgomery's sentence")
});

export const truncateAll = async () => query('TRUNCATE urgent_action');