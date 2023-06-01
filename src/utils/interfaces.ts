export interface IngresoEstacionValues {
  id: string;
  description: {
    value: string;
    metadata: object;
  };
  location: {
    coordinates: string[];
    metadata: object;
  };
  user: {
    value: string;
  };
}
