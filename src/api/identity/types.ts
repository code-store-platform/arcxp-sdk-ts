export type MigrateIdentityCustomAttributeType = {
  name: string;
  value: string;
  type: 'String' | 'Number' | 'Date' | 'Boolean';
};

export type MigrateUserPayload = {
  identities: {
    userName: string;
    credentials: string;
    grantType: 'password';
    lastLoginDate?: string;
  }[];
  profile: {
    firstName: string;
    lastName: string;
    secondLastName?: string;
    displayName: string;
    gender?: 'MALE' | 'FEMALE';
    email: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    contacts: {
      phone: string;
      type: 'WORK' | 'HOME' | 'PRIMARY' | 'OTHER';
    }[];
    addresses: {
      line1: string;
      line2?: string;
      locality: string;
      region?: string;
      postal: string;
      country?: string;
      type: 'WORK' | 'HOME' | 'PRIMARY' | 'OTHER';
    }[];
    attributes: MigrateIdentityCustomAttributeType[];
    legacyId: string;
    deletionRule?: 1;
    emailVerified?: boolean;
    createdOn: string;
  };
  uuid?: string;
};

export type MigrateBatchUsersPayload = {
  records: MigrateUserPayload[];
};

export type MigrateBatchUsersResponse = {
  records: {
    email: string;
    success: boolean;
    errorMessage: string;
    result: 'CREATE' | 'UPDATE';
    uuid: string;
  }[];
  time: number;
  errorCount: number;
  successCount: number;
};
