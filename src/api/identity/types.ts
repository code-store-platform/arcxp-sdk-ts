export type MigrateUserPayload = {
  identities: IdentityRequestMigration[];
  profile: UserProfile;
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

export type GetUserResponse = {
  page: number;
  size: number;
  lastPage: number;
  totalCount: number;
  sort: string;
  sortDirection: string;
  result: {
    uuid: string;
    userState: boolean;
    identities: UserIdentity[];
    profile: UserProfile;
  }[];
};

export interface IdentityRequestMigration {
  /**
   * The login username for this user
   *  userName can be set up equal to email
   * @minLength 5
   * @maxLength 100
   * @example "john.doe@donotreply.com"
   */
  userName: string;
  credentials: string;
  /** The grantType of this request */
  grantType?: 'password' | 'facebook' | 'google' | 'apple';
  /**
   * The date the user last logged on for this identity, Timestamp in milliseconds.
   * @format date-time
   * @example "1680779480000"
   */
  lastLoginDate?: string;
}

export interface UserIdentity {
  /**
   * Format: date-time
   * @description Date this was created
   */
  createdOn?: string;
  /** @description User that created this */
  createdBy?: string;
  /**
   * Format: date-time
   * @description Date this was modified
   */
  modifiedOn?: string;
  /** @description User that modified this */
  modifiedBy?: string;
  /**
   * Format: int64
   * @description The id of this identity
   * @example 1
   */
  id?: number;
  /**
   * @description The login userName for this user
   * @example jdoe123
   */
  userName: string;
  /** @description Flag indicating if a password reset is required */
  passwordReset: boolean;
  /**
   * @description The type of identity
   * @example Identity
   */
  type: string;
  /**
   * Format: date-time
   * @description The date that this identity last logged on
   */
  lastLoginDate?: string;
  /** @description Flag indicating if this identity is locked */
  locked?: boolean;
  /** @description Flag indicating if this identity is of oidc */
  oidc?: boolean;
}

export interface UserProfile {
  /**
   * Format: date-time
   * @description Date this was created
   */
  createdOn?: string;
  /** @description User that created this */
  createdBy?: string;
  /**
   * Format: date-time
   * @description Date this was modified
   */
  modifiedOn?: string;
  /** @description User that modified this */
  modifiedBy?: string;
  /**
   * @description First Name
   * @example John
   */
  firstName?: string;
  /**
   * @description Last Name
   * @example Doe
   */
  lastName?: string;
  /**
   * @description Second Last Name
   * @example Doey
   */
  secondLastName?: string;
  /**
   * @description Display Name
   * @example john_doe
   */
  displayName?: string;
  /**
   * @description Gender
   * @example MALE, FEMALE
   * @enum string
   */
  gender?: 'MALE' | 'FEMALE' | 'NON_CONFORMING' | 'PREFER_NOT_TO_SAY';
  /**
   * @description Email
   * @example john.doe@donotreply.com
   */
  email?: string;
  /**
   * @description Unverified Email
   * @example john.doe2@donotreply.com
   */
  unverifiedEmail?: string;
  /** @description Flag indicating if this email is verified */
  emailVerified?: boolean;
  /**
   * @description Year of Birth (YYYY)
   * @example 1999
   */
  birthYear?: string;
  /**
   * @description Month of Birth (MM)
   * @example 11
   */
  birthMonth?: string;
  /**
   * @description Day of Month of Birth (DD)
   * @example 15
   */
  birthDay?: string;
  /**
   * @description The legacy id of this profile
   * @example FGE234UIR184
   */
  legacyId?: string;
  /** @description List of contacts */
  contacts?: UserContact[];
  /** @description List of addresses */
  addresses?: UserAddress[];
  /** @description List of attributes to hold name, value pairs */
  attributes?: UserAttribute[];
  /** @description The identitities associated with this profile */
  identities?: UserIdentity[];
  /**
   * @description The status of this profile
   * @example Active/Disabled
   * @enum {string}
   */
  status?: 'Active' | 'Disabled' | 'Anonymized' | 'PendingAnonymize';
  /**
   * Format: int32
   * @description Profile Deletion Rule Id
   * @example 1
   */
  deletionRule?: number;
  profileNotificationEventResponse?: UserProfileNotificationEvent;
}

export interface UserAddress {
  /**
   * @description Address line one
   * @example 123 Main St.
   */
  line1?: string;
  line2?: string;
  locality?: string;
  region?: string;
  postal?: string;
  country?: string;
  /**
   * @description Type of address
   * @example WORK, HOME, PRIMARY, OTHER
   * @enum string
   */
  type?: 'WORK' | 'HOME' | 'PRIMARY' | 'OTHER';
}

export interface UserAttribute {
  /**
   * @description Name of the attribute
   * @example KEY1
   */
  name: string;
  /**
   * @description Value of the attribute
   * @example VALUE 1
   */
  value: string;
  /**
   * @description Type of the attribute
   * @example String, Number, Date, Boolean
   * @enum {string}
   */
  type: 'String' | 'Number' | 'Boolean' | 'Date';
}

export interface UserContact {
  /**
   * @description Phone number
   * @example 555-555-5555
   */
  phone: string;
  /**
   * @description Type of phone number
   * @example WORK, HOME, PRIMARY, OTHER
   * @enum {string}
   */
  type: 'WORK' | 'HOME' | 'PRIMARY' | 'OTHER';
}

export interface UserProfileNotificationEvent {
  /**
   * Format: date-time
   * @description Date this was created
   */
  createdOn?: string;
  /** @description User that created this */
  createdBy?: string;
  /**
   * Format: date-time
   * @description Date this was modified
   */
  modifiedOn?: string;
  /** @description User that modified this */
  modifiedBy?: string;
  /**
   * Format: int64
   * @description The Profile Notification Event's ID.
   * @example 1
   */
  id: number;
  rule: ProfileDeletionRule;
  /**
   * @description UUID of Profile Deletion.
   * @example abcd123
   */
  uuid: string;
  /**
   * @description Status
   * @example Scheduled
   * @enum {string}
   */
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  /**
   * Format: date-time
   * @description Scheduled Notification Date
   */
  notificationDate: string;
  /**
   * Format: date-time
   * @description Profile Deletion Date if no action taken
   */
  actionDate: string;
  /**
   * Format: int32
   * @description Number of times a notification sent
   * @example 10
   */
  notificationSentCount: number;
}

export interface ProfileDeletionRule {
  /**
   * Format: date-time
   * @description Date this was created
   */
  createdOn?: string;
  /** @description User that created this */
  createdBy?: string;
  /**
   * Format: date-time
   * @description Date this was modified
   */
  modifiedOn?: string;
  /** @description User that modified this */
  modifiedBy?: string;
  /**
   * Format: int64
   * @description The Profile Deletion Rule's ID.
   * @example 1
   */
  id: number;
  /**
   * @description Name of Profile Deletion Rule.
   * @example Rule-1
   */
  name: string;
  /**
   * Format: int32
   * @description Elapsed Days(After) to send notification that account will be deleted if not action taken. Ex:180 days since email was not verified.
   * @example 180
   */
  notificationTriggerDays: number;
  /**
   * Format: int32
   * @description Days After deletion will happen after sending notification if no action is taken. Ex:60 days after notification event was sent consider deleting profile
   * @example 60
   */
  actionTriggerDays: number;
  /**
   * Format: int32
   * @description Period(per number of days) notification sent to users until account is deleted. Ex:Each 10 days notification event will be sent until profile is deleted
   * @example 10
   */
  notificationRecurrenceDays: number;
  /**
   * Format: int32
   * @description Number of times a notification can be sent
   * @example 180
   */
  notificationLimit: number;
  /** @enum {string} */
  typeId: 'EMAIL_NEVER_VERIFIED' | 'NO_SIGN_IN' | 'LAST_LOGIN';
}
