import { VIEW_COUNTER_URL } from '@/env';

export const UPDATE_VIEW_COUNTER_URL = VIEW_COUNTER_URL
    ? `${VIEW_COUNTER_URL}/counter`
    : undefined;