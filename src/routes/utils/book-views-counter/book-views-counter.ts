import axios from 'axios';
import { UPDATE_VIEW_COUNTER_URL } from './book-views-counter-constants';

export const getBookViewsCounter = async (bookId: string): Promise<number | null> => {
    return UPDATE_VIEW_COUNTER_URL
        ? (await axios.post<number>(`${UPDATE_VIEW_COUNTER_URL}/${bookId}`)).data
        : null;
};
