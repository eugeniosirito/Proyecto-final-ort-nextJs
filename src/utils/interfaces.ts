export interface IngresoEstacionValues {
  description: {
    value: string;
    metadata: object;
  };
  user: {
    value: {
      name: string;
      lastName: string;
      email: string;
      metadata: object;
    };
  };
  sensors: {
    value: [];
    metadata: object;
  };
  dataPublication: string;
  location: {
    coordinates: string[];
    metadata: object;
  };
}
