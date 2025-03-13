import { createFileRoute } from '@tanstack/react-router';
import { NewsAndUpdate } from '../pages';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewsAndUpdate />;
}
