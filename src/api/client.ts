import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

import { config } from '../configs';

export const queryClient = new QueryClient();

export const client = axios.create({
  baseURL: config.backendUrl,
});
