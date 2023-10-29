import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
};

export type Account = {
  code: Scalars['String']['output'];
  mcId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partnerId: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type CheckoutApi = {
  _parentPath?: Maybe<Scalars['String']['output']>;
  accountId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  partnerId: Scalars['String']['output'];
};

export type CheckoutReference = {
  _parentPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  partnerId: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

/** Response after creating a Model */
export type CreateMutationResponse = MutationResponse & {
  __typename?: 'CreateMutationResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Id of The newly created record */
  id?: Maybe<Scalars['ID']['output']>;
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** Response after deleting a Model */
export type DeleteResponse = MutationResponse & {
  __typename?: 'DeleteResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** The ID of the deleted Model */
  id?: Maybe<Scalars['ID']['output']>;
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

export type KashRequest = {
  _parentPath?: Maybe<Scalars['String']['output']>;
  callbackUrl?: Maybe<Scalars['String']['output']>;
  completed: Scalars['Boolean']['output'];
  data: RequestData;
  emitId: Scalars['String']['output'];
  fields: Array<Maybe<Scalars['String']['output']>>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  noCancel?: Maybe<Scalars['Boolean']['output']>;
  result?: Maybe<Scalars['Boolean']['output']>;
  secured: Scalars['Boolean']['output'];
  type?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type KashRequestMutationResponse = MutationResponse & {
  __typename?: 'KashRequestMutationResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** KashRequest Id after creation */
  id?: Maybe<Scalars['String']['output']>;
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** ModelType use by bsc-firstore-orm */
export type ModelType = {
  _parentPath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRequest: KashRequestMutationResponse;
};


export type MutationCreateRequestArgs = {
  params: RequestInput;
};

export type MutationResponse = {
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  ping: QueryResponse;
};


export type QueryPingArgs = {
  name: Scalars['String']['input'];
};

export type QueryInput = {
  queries?: InputMaybe<Array<InputMaybe<QueryInputElement>>>;
};

export type QueryInputElement = {
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  field: Scalars['String']['input'];
  float?: InputMaybe<Scalars['Float']['input']>;
  int?: InputMaybe<Scalars['Int']['input']>;
  op: QueryOp;
  string?: InputMaybe<Scalars['String']['input']>;
};

export enum QueryOp {
  ArrayContains = 'ARRAY_CONTAINS',
  ArrayContainsAny = 'ARRAY_CONTAINS_ANY',
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lt = 'LT',
  Lte = 'LTE',
  Neq = 'NEQ',
  Nin = 'NIN'
}

export type QueryResponse = {
  __typename?: 'QueryResponse';
  text?: Maybe<Scalars['String']['output']>;
};

export type RequestData = {
  amount: Scalars['Float']['output'];
  category: Scalars['Int']['output'];
  creditId: Scalars['String']['output'];
  creditName: Scalars['String']['output'];
  currencyCode: Scalars['String']['output'];
  info: Scalars['String']['output'];
  mcId: Scalars['String']['output'];
  partnerId?: Maybe<Scalars['String']['output']>;
  transactionId: Scalars['ID']['output'];
};

export type RequestInput = {
  amount: Scalars['Float']['input'];
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  noCancel?: InputMaybe<Scalars['Boolean']['input']>;
  transactionId: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Account: never;
  CheckoutApi: never;
  CheckoutReference: never;
  KashRequest: never;
  ModelType: never;
  MutationResponse: ( CreateMutationResponse ) | ( DeleteResponse ) | ( KashRequestMutationResponse );
  RequestData: never;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Account']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CheckoutApi: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CheckoutApi']>;
  CheckoutReference: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CheckoutReference']>;
  CreateMutationResponse: ResolverTypeWrapper<CreateMutationResponse>;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  KashRequest: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['KashRequest']>;
  KashRequestMutationResponse: ResolverTypeWrapper<KashRequestMutationResponse>;
  ModelType: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ModelType']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Query: ResolverTypeWrapper<{}>;
  QueryInput: QueryInput;
  QueryInputElement: QueryInputElement;
  QueryOp: QueryOp;
  QueryResponse: ResolverTypeWrapper<QueryResponse>;
  RequestData: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['RequestData']>;
  RequestInput: RequestInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: ResolversInterfaceTypes<ResolversParentTypes>['Account'];
  Boolean: Scalars['Boolean']['output'];
  CheckoutApi: ResolversInterfaceTypes<ResolversParentTypes>['CheckoutApi'];
  CheckoutReference: ResolversInterfaceTypes<ResolversParentTypes>['CheckoutReference'];
  CreateMutationResponse: CreateMutationResponse;
  DeleteResponse: DeleteResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  KashRequest: ResolversInterfaceTypes<ResolversParentTypes>['KashRequest'];
  KashRequestMutationResponse: KashRequestMutationResponse;
  ModelType: ResolversInterfaceTypes<ResolversParentTypes>['ModelType'];
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  Query: {};
  QueryInput: QueryInput;
  QueryInputElement: QueryInputElement;
  QueryResponse: QueryResponse;
  RequestData: ResolversInterfaceTypes<ResolversParentTypes>['RequestData'];
  RequestInput: RequestInput;
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mcId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partnerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type CheckoutApiResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutApi'] = ResolversParentTypes['CheckoutApi']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _parentPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  partnerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CheckoutReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutReference'] = ResolversParentTypes['CheckoutReference']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _parentPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  partnerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type CreateMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMutationResponse'] = ResolversParentTypes['CreateMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KashRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['KashRequest'] = ResolversParentTypes['KashRequest']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _parentPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  callbackUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['RequestData'], ParentType, ContextType>;
  emitId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fields?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  noCancel?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  secured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type KashRequestMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['KashRequestMutationResponse'] = ResolversParentTypes['KashRequestMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelType'] = ResolversParentTypes['ModelType']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _parentPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createRequest?: Resolver<ResolversTypes['KashRequestMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateRequestArgs, 'params'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'CreateMutationResponse' | 'DeleteResponse' | 'KashRequestMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ping?: Resolver<ResolversTypes['QueryResponse'], ParentType, ContextType, RequireFields<QueryPingArgs, 'name'>>;
};

export type QueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryResponse'] = ResolversParentTypes['QueryResponse']> = {
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestData'] = ResolversParentTypes['RequestData']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creditId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creditName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mcId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partnerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  CheckoutApi?: CheckoutApiResolvers<ContextType>;
  CheckoutReference?: CheckoutReferenceResolvers<ContextType>;
  CreateMutationResponse?: CreateMutationResponseResolvers<ContextType>;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  KashRequest?: KashRequestResolvers<ContextType>;
  KashRequestMutationResponse?: KashRequestMutationResponseResolvers<ContextType>;
  ModelType?: ModelTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryResponse?: QueryResponseResolvers<ContextType>;
  RequestData?: RequestDataResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
};

