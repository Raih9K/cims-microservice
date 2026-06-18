
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ShopifyStore
 * 
 */
export type ShopifyStore = $Result.DefaultSelection<Prisma.$ShopifyStorePayload>
/**
 * Model ShopifyLog
 * 
 */
export type ShopifyLog = $Result.DefaultSelection<Prisma.$ShopifyLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ShopifyStores
 * const shopifyStores = await prisma.shopifyStore.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ShopifyStores
   * const shopifyStores = await prisma.shopifyStore.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.shopifyStore`: Exposes CRUD operations for the **ShopifyStore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopifyStores
    * const shopifyStores = await prisma.shopifyStore.findMany()
    * ```
    */
  get shopifyStore(): Prisma.ShopifyStoreDelegate<ExtArgs>;

  /**
   * `prisma.shopifyLog`: Exposes CRUD operations for the **ShopifyLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopifyLogs
    * const shopifyLogs = await prisma.shopifyLog.findMany()
    * ```
    */
  get shopifyLog(): Prisma.ShopifyLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ShopifyStore: 'ShopifyStore',
    ShopifyLog: 'ShopifyLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "shopifyStore" | "shopifyLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ShopifyStore: {
        payload: Prisma.$ShopifyStorePayload<ExtArgs>
        fields: Prisma.ShopifyStoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopifyStoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopifyStoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          findFirst: {
            args: Prisma.ShopifyStoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopifyStoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          findMany: {
            args: Prisma.ShopifyStoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>[]
          }
          create: {
            args: Prisma.ShopifyStoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          createMany: {
            args: Prisma.ShopifyStoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ShopifyStoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          update: {
            args: Prisma.ShopifyStoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          deleteMany: {
            args: Prisma.ShopifyStoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopifyStoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShopifyStoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyStorePayload>
          }
          aggregate: {
            args: Prisma.ShopifyStoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopifyStore>
          }
          groupBy: {
            args: Prisma.ShopifyStoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopifyStoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopifyStoreCountArgs<ExtArgs>
            result: $Utils.Optional<ShopifyStoreCountAggregateOutputType> | number
          }
        }
      }
      ShopifyLog: {
        payload: Prisma.$ShopifyLogPayload<ExtArgs>
        fields: Prisma.ShopifyLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopifyLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopifyLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          findFirst: {
            args: Prisma.ShopifyLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopifyLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          findMany: {
            args: Prisma.ShopifyLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>[]
          }
          create: {
            args: Prisma.ShopifyLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          createMany: {
            args: Prisma.ShopifyLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ShopifyLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          update: {
            args: Prisma.ShopifyLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          deleteMany: {
            args: Prisma.ShopifyLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopifyLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShopifyLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyLogPayload>
          }
          aggregate: {
            args: Prisma.ShopifyLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopifyLog>
          }
          groupBy: {
            args: Prisma.ShopifyLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopifyLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopifyLogCountArgs<ExtArgs>
            result: $Utils.Optional<ShopifyLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ShopifyStoreCountOutputType
   */

  export type ShopifyStoreCountOutputType = {
    logs: number
  }

  export type ShopifyStoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | ShopifyStoreCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * ShopifyStoreCountOutputType without action
   */
  export type ShopifyStoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStoreCountOutputType
     */
    select?: ShopifyStoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopifyStoreCountOutputType without action
   */
  export type ShopifyStoreCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopifyLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ShopifyStore
   */

  export type AggregateShopifyStore = {
    _count: ShopifyStoreCountAggregateOutputType | null
    _avg: ShopifyStoreAvgAggregateOutputType | null
    _sum: ShopifyStoreSumAggregateOutputType | null
    _min: ShopifyStoreMinAggregateOutputType | null
    _max: ShopifyStoreMaxAggregateOutputType | null
  }

  export type ShopifyStoreAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type ShopifyStoreSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type ShopifyStoreMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    shop: string | null
    accessToken: string | null
    scope: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopifyStoreMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    shop: string | null
    accessToken: string | null
    scope: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopifyStoreCountAggregateOutputType = {
    id: number
    companyId: number
    shop: number
    accessToken: number
    scope: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopifyStoreAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type ShopifyStoreSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type ShopifyStoreMinAggregateInputType = {
    id?: true
    companyId?: true
    shop?: true
    accessToken?: true
    scope?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopifyStoreMaxAggregateInputType = {
    id?: true
    companyId?: true
    shop?: true
    accessToken?: true
    scope?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopifyStoreCountAggregateInputType = {
    id?: true
    companyId?: true
    shop?: true
    accessToken?: true
    scope?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopifyStoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyStore to aggregate.
     */
    where?: ShopifyStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyStores to fetch.
     */
    orderBy?: ShopifyStoreOrderByWithRelationInput | ShopifyStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopifyStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopifyStores
    **/
    _count?: true | ShopifyStoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopifyStoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopifyStoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopifyStoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopifyStoreMaxAggregateInputType
  }

  export type GetShopifyStoreAggregateType<T extends ShopifyStoreAggregateArgs> = {
        [P in keyof T & keyof AggregateShopifyStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopifyStore[P]>
      : GetScalarType<T[P], AggregateShopifyStore[P]>
  }




  export type ShopifyStoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopifyStoreWhereInput
    orderBy?: ShopifyStoreOrderByWithAggregationInput | ShopifyStoreOrderByWithAggregationInput[]
    by: ShopifyStoreScalarFieldEnum[] | ShopifyStoreScalarFieldEnum
    having?: ShopifyStoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopifyStoreCountAggregateInputType | true
    _avg?: ShopifyStoreAvgAggregateInputType
    _sum?: ShopifyStoreSumAggregateInputType
    _min?: ShopifyStoreMinAggregateInputType
    _max?: ShopifyStoreMaxAggregateInputType
  }

  export type ShopifyStoreGroupByOutputType = {
    id: number
    companyId: number
    shop: string
    accessToken: string | null
    scope: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ShopifyStoreCountAggregateOutputType | null
    _avg: ShopifyStoreAvgAggregateOutputType | null
    _sum: ShopifyStoreSumAggregateOutputType | null
    _min: ShopifyStoreMinAggregateOutputType | null
    _max: ShopifyStoreMaxAggregateOutputType | null
  }

  type GetShopifyStoreGroupByPayload<T extends ShopifyStoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopifyStoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopifyStoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopifyStoreGroupByOutputType[P]>
            : GetScalarType<T[P], ShopifyStoreGroupByOutputType[P]>
        }
      >
    >


  export type ShopifyStoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    shop?: boolean
    accessToken?: boolean
    scope?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    logs?: boolean | ShopifyStore$logsArgs<ExtArgs>
    _count?: boolean | ShopifyStoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopifyStore"]>


  export type ShopifyStoreSelectScalar = {
    id?: boolean
    companyId?: boolean
    shop?: boolean
    accessToken?: boolean
    scope?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopifyStoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | ShopifyStore$logsArgs<ExtArgs>
    _count?: boolean | ShopifyStoreCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ShopifyStorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopifyStore"
    objects: {
      logs: Prisma.$ShopifyLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      shop: string
      accessToken: string | null
      scope: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopifyStore"]>
    composites: {}
  }

  type ShopifyStoreGetPayload<S extends boolean | null | undefined | ShopifyStoreDefaultArgs> = $Result.GetResult<Prisma.$ShopifyStorePayload, S>

  type ShopifyStoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShopifyStoreFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShopifyStoreCountAggregateInputType | true
    }

  export interface ShopifyStoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopifyStore'], meta: { name: 'ShopifyStore' } }
    /**
     * Find zero or one ShopifyStore that matches the filter.
     * @param {ShopifyStoreFindUniqueArgs} args - Arguments to find a ShopifyStore
     * @example
     * // Get one ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopifyStoreFindUniqueArgs>(args: SelectSubset<T, ShopifyStoreFindUniqueArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ShopifyStore that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShopifyStoreFindUniqueOrThrowArgs} args - Arguments to find a ShopifyStore
     * @example
     * // Get one ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopifyStoreFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopifyStoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ShopifyStore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreFindFirstArgs} args - Arguments to find a ShopifyStore
     * @example
     * // Get one ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopifyStoreFindFirstArgs>(args?: SelectSubset<T, ShopifyStoreFindFirstArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ShopifyStore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreFindFirstOrThrowArgs} args - Arguments to find a ShopifyStore
     * @example
     * // Get one ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopifyStoreFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopifyStoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ShopifyStores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopifyStores
     * const shopifyStores = await prisma.shopifyStore.findMany()
     * 
     * // Get first 10 ShopifyStores
     * const shopifyStores = await prisma.shopifyStore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopifyStoreWithIdOnly = await prisma.shopifyStore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopifyStoreFindManyArgs>(args?: SelectSubset<T, ShopifyStoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ShopifyStore.
     * @param {ShopifyStoreCreateArgs} args - Arguments to create a ShopifyStore.
     * @example
     * // Create one ShopifyStore
     * const ShopifyStore = await prisma.shopifyStore.create({
     *   data: {
     *     // ... data to create a ShopifyStore
     *   }
     * })
     * 
     */
    create<T extends ShopifyStoreCreateArgs>(args: SelectSubset<T, ShopifyStoreCreateArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ShopifyStores.
     * @param {ShopifyStoreCreateManyArgs} args - Arguments to create many ShopifyStores.
     * @example
     * // Create many ShopifyStores
     * const shopifyStore = await prisma.shopifyStore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopifyStoreCreateManyArgs>(args?: SelectSubset<T, ShopifyStoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ShopifyStore.
     * @param {ShopifyStoreDeleteArgs} args - Arguments to delete one ShopifyStore.
     * @example
     * // Delete one ShopifyStore
     * const ShopifyStore = await prisma.shopifyStore.delete({
     *   where: {
     *     // ... filter to delete one ShopifyStore
     *   }
     * })
     * 
     */
    delete<T extends ShopifyStoreDeleteArgs>(args: SelectSubset<T, ShopifyStoreDeleteArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ShopifyStore.
     * @param {ShopifyStoreUpdateArgs} args - Arguments to update one ShopifyStore.
     * @example
     * // Update one ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopifyStoreUpdateArgs>(args: SelectSubset<T, ShopifyStoreUpdateArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ShopifyStores.
     * @param {ShopifyStoreDeleteManyArgs} args - Arguments to filter ShopifyStores to delete.
     * @example
     * // Delete a few ShopifyStores
     * const { count } = await prisma.shopifyStore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopifyStoreDeleteManyArgs>(args?: SelectSubset<T, ShopifyStoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopifyStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopifyStores
     * const shopifyStore = await prisma.shopifyStore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopifyStoreUpdateManyArgs>(args: SelectSubset<T, ShopifyStoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShopifyStore.
     * @param {ShopifyStoreUpsertArgs} args - Arguments to update or create a ShopifyStore.
     * @example
     * // Update or create a ShopifyStore
     * const shopifyStore = await prisma.shopifyStore.upsert({
     *   create: {
     *     // ... data to create a ShopifyStore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopifyStore we want to update
     *   }
     * })
     */
    upsert<T extends ShopifyStoreUpsertArgs>(args: SelectSubset<T, ShopifyStoreUpsertArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ShopifyStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreCountArgs} args - Arguments to filter ShopifyStores to count.
     * @example
     * // Count the number of ShopifyStores
     * const count = await prisma.shopifyStore.count({
     *   where: {
     *     // ... the filter for the ShopifyStores we want to count
     *   }
     * })
    **/
    count<T extends ShopifyStoreCountArgs>(
      args?: Subset<T, ShopifyStoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopifyStoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopifyStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopifyStoreAggregateArgs>(args: Subset<T, ShopifyStoreAggregateArgs>): Prisma.PrismaPromise<GetShopifyStoreAggregateType<T>>

    /**
     * Group by ShopifyStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyStoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopifyStoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopifyStoreGroupByArgs['orderBy'] }
        : { orderBy?: ShopifyStoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopifyStoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopifyStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopifyStore model
   */
  readonly fields: ShopifyStoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopifyStore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopifyStoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends ShopifyStore$logsArgs<ExtArgs> = {}>(args?: Subset<T, ShopifyStore$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopifyStore model
   */ 
  interface ShopifyStoreFieldRefs {
    readonly id: FieldRef<"ShopifyStore", 'Int'>
    readonly companyId: FieldRef<"ShopifyStore", 'Int'>
    readonly shop: FieldRef<"ShopifyStore", 'String'>
    readonly accessToken: FieldRef<"ShopifyStore", 'String'>
    readonly scope: FieldRef<"ShopifyStore", 'String'>
    readonly status: FieldRef<"ShopifyStore", 'String'>
    readonly createdAt: FieldRef<"ShopifyStore", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopifyStore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopifyStore findUnique
   */
  export type ShopifyStoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyStore to fetch.
     */
    where: ShopifyStoreWhereUniqueInput
  }

  /**
   * ShopifyStore findUniqueOrThrow
   */
  export type ShopifyStoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyStore to fetch.
     */
    where: ShopifyStoreWhereUniqueInput
  }

  /**
   * ShopifyStore findFirst
   */
  export type ShopifyStoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyStore to fetch.
     */
    where?: ShopifyStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyStores to fetch.
     */
    orderBy?: ShopifyStoreOrderByWithRelationInput | ShopifyStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyStores.
     */
    cursor?: ShopifyStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyStores.
     */
    distinct?: ShopifyStoreScalarFieldEnum | ShopifyStoreScalarFieldEnum[]
  }

  /**
   * ShopifyStore findFirstOrThrow
   */
  export type ShopifyStoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyStore to fetch.
     */
    where?: ShopifyStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyStores to fetch.
     */
    orderBy?: ShopifyStoreOrderByWithRelationInput | ShopifyStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyStores.
     */
    cursor?: ShopifyStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyStores.
     */
    distinct?: ShopifyStoreScalarFieldEnum | ShopifyStoreScalarFieldEnum[]
  }

  /**
   * ShopifyStore findMany
   */
  export type ShopifyStoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyStores to fetch.
     */
    where?: ShopifyStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyStores to fetch.
     */
    orderBy?: ShopifyStoreOrderByWithRelationInput | ShopifyStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopifyStores.
     */
    cursor?: ShopifyStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyStores.
     */
    skip?: number
    distinct?: ShopifyStoreScalarFieldEnum | ShopifyStoreScalarFieldEnum[]
  }

  /**
   * ShopifyStore create
   */
  export type ShopifyStoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopifyStore.
     */
    data: XOR<ShopifyStoreCreateInput, ShopifyStoreUncheckedCreateInput>
  }

  /**
   * ShopifyStore createMany
   */
  export type ShopifyStoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopifyStores.
     */
    data: ShopifyStoreCreateManyInput | ShopifyStoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopifyStore update
   */
  export type ShopifyStoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopifyStore.
     */
    data: XOR<ShopifyStoreUpdateInput, ShopifyStoreUncheckedUpdateInput>
    /**
     * Choose, which ShopifyStore to update.
     */
    where: ShopifyStoreWhereUniqueInput
  }

  /**
   * ShopifyStore updateMany
   */
  export type ShopifyStoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopifyStores.
     */
    data: XOR<ShopifyStoreUpdateManyMutationInput, ShopifyStoreUncheckedUpdateManyInput>
    /**
     * Filter which ShopifyStores to update
     */
    where?: ShopifyStoreWhereInput
  }

  /**
   * ShopifyStore upsert
   */
  export type ShopifyStoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopifyStore to update in case it exists.
     */
    where: ShopifyStoreWhereUniqueInput
    /**
     * In case the ShopifyStore found by the `where` argument doesn't exist, create a new ShopifyStore with this data.
     */
    create: XOR<ShopifyStoreCreateInput, ShopifyStoreUncheckedCreateInput>
    /**
     * In case the ShopifyStore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopifyStoreUpdateInput, ShopifyStoreUncheckedUpdateInput>
  }

  /**
   * ShopifyStore delete
   */
  export type ShopifyStoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
    /**
     * Filter which ShopifyStore to delete.
     */
    where: ShopifyStoreWhereUniqueInput
  }

  /**
   * ShopifyStore deleteMany
   */
  export type ShopifyStoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyStores to delete
     */
    where?: ShopifyStoreWhereInput
  }

  /**
   * ShopifyStore.logs
   */
  export type ShopifyStore$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    where?: ShopifyLogWhereInput
    orderBy?: ShopifyLogOrderByWithRelationInput | ShopifyLogOrderByWithRelationInput[]
    cursor?: ShopifyLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopifyLogScalarFieldEnum | ShopifyLogScalarFieldEnum[]
  }

  /**
   * ShopifyStore without action
   */
  export type ShopifyStoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyStore
     */
    select?: ShopifyStoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyStoreInclude<ExtArgs> | null
  }


  /**
   * Model ShopifyLog
   */

  export type AggregateShopifyLog = {
    _count: ShopifyLogCountAggregateOutputType | null
    _avg: ShopifyLogAvgAggregateOutputType | null
    _sum: ShopifyLogSumAggregateOutputType | null
    _min: ShopifyLogMinAggregateOutputType | null
    _max: ShopifyLogMaxAggregateOutputType | null
  }

  export type ShopifyLogAvgAggregateOutputType = {
    id: number | null
    shopId: number | null
  }

  export type ShopifyLogSumAggregateOutputType = {
    id: number | null
    shopId: number | null
  }

  export type ShopifyLogMinAggregateOutputType = {
    id: number | null
    shopId: number | null
    level: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ShopifyLogMaxAggregateOutputType = {
    id: number | null
    shopId: number | null
    level: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ShopifyLogCountAggregateOutputType = {
    id: number
    shopId: number
    level: number
    message: number
    payload: number
    createdAt: number
    _all: number
  }


  export type ShopifyLogAvgAggregateInputType = {
    id?: true
    shopId?: true
  }

  export type ShopifyLogSumAggregateInputType = {
    id?: true
    shopId?: true
  }

  export type ShopifyLogMinAggregateInputType = {
    id?: true
    shopId?: true
    level?: true
    message?: true
    createdAt?: true
  }

  export type ShopifyLogMaxAggregateInputType = {
    id?: true
    shopId?: true
    level?: true
    message?: true
    createdAt?: true
  }

  export type ShopifyLogCountAggregateInputType = {
    id?: true
    shopId?: true
    level?: true
    message?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type ShopifyLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyLog to aggregate.
     */
    where?: ShopifyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyLogs to fetch.
     */
    orderBy?: ShopifyLogOrderByWithRelationInput | ShopifyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopifyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopifyLogs
    **/
    _count?: true | ShopifyLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopifyLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopifyLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopifyLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopifyLogMaxAggregateInputType
  }

  export type GetShopifyLogAggregateType<T extends ShopifyLogAggregateArgs> = {
        [P in keyof T & keyof AggregateShopifyLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopifyLog[P]>
      : GetScalarType<T[P], AggregateShopifyLog[P]>
  }




  export type ShopifyLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopifyLogWhereInput
    orderBy?: ShopifyLogOrderByWithAggregationInput | ShopifyLogOrderByWithAggregationInput[]
    by: ShopifyLogScalarFieldEnum[] | ShopifyLogScalarFieldEnum
    having?: ShopifyLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopifyLogCountAggregateInputType | true
    _avg?: ShopifyLogAvgAggregateInputType
    _sum?: ShopifyLogSumAggregateInputType
    _min?: ShopifyLogMinAggregateInputType
    _max?: ShopifyLogMaxAggregateInputType
  }

  export type ShopifyLogGroupByOutputType = {
    id: number
    shopId: number
    level: string
    message: string
    payload: JsonValue | null
    createdAt: Date
    _count: ShopifyLogCountAggregateOutputType | null
    _avg: ShopifyLogAvgAggregateOutputType | null
    _sum: ShopifyLogSumAggregateOutputType | null
    _min: ShopifyLogMinAggregateOutputType | null
    _max: ShopifyLogMaxAggregateOutputType | null
  }

  type GetShopifyLogGroupByPayload<T extends ShopifyLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopifyLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopifyLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopifyLogGroupByOutputType[P]>
            : GetScalarType<T[P], ShopifyLogGroupByOutputType[P]>
        }
      >
    >


  export type ShopifyLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    level?: boolean
    message?: boolean
    payload?: boolean
    createdAt?: boolean
    shop?: boolean | ShopifyStoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopifyLog"]>


  export type ShopifyLogSelectScalar = {
    id?: boolean
    shopId?: boolean
    level?: boolean
    message?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type ShopifyLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopifyStoreDefaultArgs<ExtArgs>
  }

  export type $ShopifyLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopifyLog"
    objects: {
      shop: Prisma.$ShopifyStorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      shopId: number
      level: string
      message: string
      payload: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["shopifyLog"]>
    composites: {}
  }

  type ShopifyLogGetPayload<S extends boolean | null | undefined | ShopifyLogDefaultArgs> = $Result.GetResult<Prisma.$ShopifyLogPayload, S>

  type ShopifyLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShopifyLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShopifyLogCountAggregateInputType | true
    }

  export interface ShopifyLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopifyLog'], meta: { name: 'ShopifyLog' } }
    /**
     * Find zero or one ShopifyLog that matches the filter.
     * @param {ShopifyLogFindUniqueArgs} args - Arguments to find a ShopifyLog
     * @example
     * // Get one ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopifyLogFindUniqueArgs>(args: SelectSubset<T, ShopifyLogFindUniqueArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ShopifyLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShopifyLogFindUniqueOrThrowArgs} args - Arguments to find a ShopifyLog
     * @example
     * // Get one ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopifyLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopifyLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ShopifyLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogFindFirstArgs} args - Arguments to find a ShopifyLog
     * @example
     * // Get one ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopifyLogFindFirstArgs>(args?: SelectSubset<T, ShopifyLogFindFirstArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ShopifyLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogFindFirstOrThrowArgs} args - Arguments to find a ShopifyLog
     * @example
     * // Get one ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopifyLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopifyLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ShopifyLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopifyLogs
     * const shopifyLogs = await prisma.shopifyLog.findMany()
     * 
     * // Get first 10 ShopifyLogs
     * const shopifyLogs = await prisma.shopifyLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopifyLogWithIdOnly = await prisma.shopifyLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopifyLogFindManyArgs>(args?: SelectSubset<T, ShopifyLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ShopifyLog.
     * @param {ShopifyLogCreateArgs} args - Arguments to create a ShopifyLog.
     * @example
     * // Create one ShopifyLog
     * const ShopifyLog = await prisma.shopifyLog.create({
     *   data: {
     *     // ... data to create a ShopifyLog
     *   }
     * })
     * 
     */
    create<T extends ShopifyLogCreateArgs>(args: SelectSubset<T, ShopifyLogCreateArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ShopifyLogs.
     * @param {ShopifyLogCreateManyArgs} args - Arguments to create many ShopifyLogs.
     * @example
     * // Create many ShopifyLogs
     * const shopifyLog = await prisma.shopifyLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopifyLogCreateManyArgs>(args?: SelectSubset<T, ShopifyLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ShopifyLog.
     * @param {ShopifyLogDeleteArgs} args - Arguments to delete one ShopifyLog.
     * @example
     * // Delete one ShopifyLog
     * const ShopifyLog = await prisma.shopifyLog.delete({
     *   where: {
     *     // ... filter to delete one ShopifyLog
     *   }
     * })
     * 
     */
    delete<T extends ShopifyLogDeleteArgs>(args: SelectSubset<T, ShopifyLogDeleteArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ShopifyLog.
     * @param {ShopifyLogUpdateArgs} args - Arguments to update one ShopifyLog.
     * @example
     * // Update one ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopifyLogUpdateArgs>(args: SelectSubset<T, ShopifyLogUpdateArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ShopifyLogs.
     * @param {ShopifyLogDeleteManyArgs} args - Arguments to filter ShopifyLogs to delete.
     * @example
     * // Delete a few ShopifyLogs
     * const { count } = await prisma.shopifyLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopifyLogDeleteManyArgs>(args?: SelectSubset<T, ShopifyLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopifyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopifyLogs
     * const shopifyLog = await prisma.shopifyLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopifyLogUpdateManyArgs>(args: SelectSubset<T, ShopifyLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShopifyLog.
     * @param {ShopifyLogUpsertArgs} args - Arguments to update or create a ShopifyLog.
     * @example
     * // Update or create a ShopifyLog
     * const shopifyLog = await prisma.shopifyLog.upsert({
     *   create: {
     *     // ... data to create a ShopifyLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopifyLog we want to update
     *   }
     * })
     */
    upsert<T extends ShopifyLogUpsertArgs>(args: SelectSubset<T, ShopifyLogUpsertArgs<ExtArgs>>): Prisma__ShopifyLogClient<$Result.GetResult<Prisma.$ShopifyLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ShopifyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogCountArgs} args - Arguments to filter ShopifyLogs to count.
     * @example
     * // Count the number of ShopifyLogs
     * const count = await prisma.shopifyLog.count({
     *   where: {
     *     // ... the filter for the ShopifyLogs we want to count
     *   }
     * })
    **/
    count<T extends ShopifyLogCountArgs>(
      args?: Subset<T, ShopifyLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopifyLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopifyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopifyLogAggregateArgs>(args: Subset<T, ShopifyLogAggregateArgs>): Prisma.PrismaPromise<GetShopifyLogAggregateType<T>>

    /**
     * Group by ShopifyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopifyLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopifyLogGroupByArgs['orderBy'] }
        : { orderBy?: ShopifyLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopifyLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopifyLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopifyLog model
   */
  readonly fields: ShopifyLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopifyLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopifyLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopifyStoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopifyStoreDefaultArgs<ExtArgs>>): Prisma__ShopifyStoreClient<$Result.GetResult<Prisma.$ShopifyStorePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopifyLog model
   */ 
  interface ShopifyLogFieldRefs {
    readonly id: FieldRef<"ShopifyLog", 'Int'>
    readonly shopId: FieldRef<"ShopifyLog", 'Int'>
    readonly level: FieldRef<"ShopifyLog", 'String'>
    readonly message: FieldRef<"ShopifyLog", 'String'>
    readonly payload: FieldRef<"ShopifyLog", 'Json'>
    readonly createdAt: FieldRef<"ShopifyLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopifyLog findUnique
   */
  export type ShopifyLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyLog to fetch.
     */
    where: ShopifyLogWhereUniqueInput
  }

  /**
   * ShopifyLog findUniqueOrThrow
   */
  export type ShopifyLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyLog to fetch.
     */
    where: ShopifyLogWhereUniqueInput
  }

  /**
   * ShopifyLog findFirst
   */
  export type ShopifyLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyLog to fetch.
     */
    where?: ShopifyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyLogs to fetch.
     */
    orderBy?: ShopifyLogOrderByWithRelationInput | ShopifyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyLogs.
     */
    cursor?: ShopifyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyLogs.
     */
    distinct?: ShopifyLogScalarFieldEnum | ShopifyLogScalarFieldEnum[]
  }

  /**
   * ShopifyLog findFirstOrThrow
   */
  export type ShopifyLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyLog to fetch.
     */
    where?: ShopifyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyLogs to fetch.
     */
    orderBy?: ShopifyLogOrderByWithRelationInput | ShopifyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyLogs.
     */
    cursor?: ShopifyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyLogs.
     */
    distinct?: ShopifyLogScalarFieldEnum | ShopifyLogScalarFieldEnum[]
  }

  /**
   * ShopifyLog findMany
   */
  export type ShopifyLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyLogs to fetch.
     */
    where?: ShopifyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyLogs to fetch.
     */
    orderBy?: ShopifyLogOrderByWithRelationInput | ShopifyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopifyLogs.
     */
    cursor?: ShopifyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyLogs.
     */
    skip?: number
    distinct?: ShopifyLogScalarFieldEnum | ShopifyLogScalarFieldEnum[]
  }

  /**
   * ShopifyLog create
   */
  export type ShopifyLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopifyLog.
     */
    data: XOR<ShopifyLogCreateInput, ShopifyLogUncheckedCreateInput>
  }

  /**
   * ShopifyLog createMany
   */
  export type ShopifyLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopifyLogs.
     */
    data: ShopifyLogCreateManyInput | ShopifyLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopifyLog update
   */
  export type ShopifyLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopifyLog.
     */
    data: XOR<ShopifyLogUpdateInput, ShopifyLogUncheckedUpdateInput>
    /**
     * Choose, which ShopifyLog to update.
     */
    where: ShopifyLogWhereUniqueInput
  }

  /**
   * ShopifyLog updateMany
   */
  export type ShopifyLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopifyLogs.
     */
    data: XOR<ShopifyLogUpdateManyMutationInput, ShopifyLogUncheckedUpdateManyInput>
    /**
     * Filter which ShopifyLogs to update
     */
    where?: ShopifyLogWhereInput
  }

  /**
   * ShopifyLog upsert
   */
  export type ShopifyLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopifyLog to update in case it exists.
     */
    where: ShopifyLogWhereUniqueInput
    /**
     * In case the ShopifyLog found by the `where` argument doesn't exist, create a new ShopifyLog with this data.
     */
    create: XOR<ShopifyLogCreateInput, ShopifyLogUncheckedCreateInput>
    /**
     * In case the ShopifyLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopifyLogUpdateInput, ShopifyLogUncheckedUpdateInput>
  }

  /**
   * ShopifyLog delete
   */
  export type ShopifyLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
    /**
     * Filter which ShopifyLog to delete.
     */
    where: ShopifyLogWhereUniqueInput
  }

  /**
   * ShopifyLog deleteMany
   */
  export type ShopifyLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyLogs to delete
     */
    where?: ShopifyLogWhereInput
  }

  /**
   * ShopifyLog without action
   */
  export type ShopifyLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyLog
     */
    select?: ShopifyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ShopifyStoreScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    shop: 'shop',
    accessToken: 'accessToken',
    scope: 'scope',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopifyStoreScalarFieldEnum = (typeof ShopifyStoreScalarFieldEnum)[keyof typeof ShopifyStoreScalarFieldEnum]


  export const ShopifyLogScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    level: 'level',
    message: 'message',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type ShopifyLogScalarFieldEnum = (typeof ShopifyLogScalarFieldEnum)[keyof typeof ShopifyLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ShopifyStoreWhereInput = {
    AND?: ShopifyStoreWhereInput | ShopifyStoreWhereInput[]
    OR?: ShopifyStoreWhereInput[]
    NOT?: ShopifyStoreWhereInput | ShopifyStoreWhereInput[]
    id?: IntFilter<"ShopifyStore"> | number
    companyId?: IntFilter<"ShopifyStore"> | number
    shop?: StringFilter<"ShopifyStore"> | string
    accessToken?: StringNullableFilter<"ShopifyStore"> | string | null
    scope?: StringNullableFilter<"ShopifyStore"> | string | null
    status?: StringFilter<"ShopifyStore"> | string
    createdAt?: DateTimeFilter<"ShopifyStore"> | Date | string
    updatedAt?: DateTimeFilter<"ShopifyStore"> | Date | string
    logs?: ShopifyLogListRelationFilter
  }

  export type ShopifyStoreOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    logs?: ShopifyLogOrderByRelationAggregateInput
  }

  export type ShopifyStoreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    shop?: string
    AND?: ShopifyStoreWhereInput | ShopifyStoreWhereInput[]
    OR?: ShopifyStoreWhereInput[]
    NOT?: ShopifyStoreWhereInput | ShopifyStoreWhereInput[]
    companyId?: IntFilter<"ShopifyStore"> | number
    accessToken?: StringNullableFilter<"ShopifyStore"> | string | null
    scope?: StringNullableFilter<"ShopifyStore"> | string | null
    status?: StringFilter<"ShopifyStore"> | string
    createdAt?: DateTimeFilter<"ShopifyStore"> | Date | string
    updatedAt?: DateTimeFilter<"ShopifyStore"> | Date | string
    logs?: ShopifyLogListRelationFilter
  }, "id" | "shop">

  export type ShopifyStoreOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopifyStoreCountOrderByAggregateInput
    _avg?: ShopifyStoreAvgOrderByAggregateInput
    _max?: ShopifyStoreMaxOrderByAggregateInput
    _min?: ShopifyStoreMinOrderByAggregateInput
    _sum?: ShopifyStoreSumOrderByAggregateInput
  }

  export type ShopifyStoreScalarWhereWithAggregatesInput = {
    AND?: ShopifyStoreScalarWhereWithAggregatesInput | ShopifyStoreScalarWhereWithAggregatesInput[]
    OR?: ShopifyStoreScalarWhereWithAggregatesInput[]
    NOT?: ShopifyStoreScalarWhereWithAggregatesInput | ShopifyStoreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ShopifyStore"> | number
    companyId?: IntWithAggregatesFilter<"ShopifyStore"> | number
    shop?: StringWithAggregatesFilter<"ShopifyStore"> | string
    accessToken?: StringNullableWithAggregatesFilter<"ShopifyStore"> | string | null
    scope?: StringNullableWithAggregatesFilter<"ShopifyStore"> | string | null
    status?: StringWithAggregatesFilter<"ShopifyStore"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ShopifyStore"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopifyStore"> | Date | string
  }

  export type ShopifyLogWhereInput = {
    AND?: ShopifyLogWhereInput | ShopifyLogWhereInput[]
    OR?: ShopifyLogWhereInput[]
    NOT?: ShopifyLogWhereInput | ShopifyLogWhereInput[]
    id?: IntFilter<"ShopifyLog"> | number
    shopId?: IntFilter<"ShopifyLog"> | number
    level?: StringFilter<"ShopifyLog"> | string
    message?: StringFilter<"ShopifyLog"> | string
    payload?: JsonNullableFilter<"ShopifyLog">
    createdAt?: DateTimeFilter<"ShopifyLog"> | Date | string
    shop?: XOR<ShopifyStoreRelationFilter, ShopifyStoreWhereInput>
  }

  export type ShopifyLogOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    level?: SortOrder
    message?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shop?: ShopifyStoreOrderByWithRelationInput
  }

  export type ShopifyLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ShopifyLogWhereInput | ShopifyLogWhereInput[]
    OR?: ShopifyLogWhereInput[]
    NOT?: ShopifyLogWhereInput | ShopifyLogWhereInput[]
    shopId?: IntFilter<"ShopifyLog"> | number
    level?: StringFilter<"ShopifyLog"> | string
    message?: StringFilter<"ShopifyLog"> | string
    payload?: JsonNullableFilter<"ShopifyLog">
    createdAt?: DateTimeFilter<"ShopifyLog"> | Date | string
    shop?: XOR<ShopifyStoreRelationFilter, ShopifyStoreWhereInput>
  }, "id">

  export type ShopifyLogOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    level?: SortOrder
    message?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ShopifyLogCountOrderByAggregateInput
    _avg?: ShopifyLogAvgOrderByAggregateInput
    _max?: ShopifyLogMaxOrderByAggregateInput
    _min?: ShopifyLogMinOrderByAggregateInput
    _sum?: ShopifyLogSumOrderByAggregateInput
  }

  export type ShopifyLogScalarWhereWithAggregatesInput = {
    AND?: ShopifyLogScalarWhereWithAggregatesInput | ShopifyLogScalarWhereWithAggregatesInput[]
    OR?: ShopifyLogScalarWhereWithAggregatesInput[]
    NOT?: ShopifyLogScalarWhereWithAggregatesInput | ShopifyLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ShopifyLog"> | number
    shopId?: IntWithAggregatesFilter<"ShopifyLog"> | number
    level?: StringWithAggregatesFilter<"ShopifyLog"> | string
    message?: StringWithAggregatesFilter<"ShopifyLog"> | string
    payload?: JsonNullableWithAggregatesFilter<"ShopifyLog">
    createdAt?: DateTimeWithAggregatesFilter<"ShopifyLog"> | Date | string
  }

  export type ShopifyStoreCreateInput = {
    companyId: number
    shop: string
    accessToken?: string | null
    scope?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ShopifyLogCreateNestedManyWithoutShopInput
  }

  export type ShopifyStoreUncheckedCreateInput = {
    id?: number
    companyId: number
    shop: string
    accessToken?: string | null
    scope?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ShopifyLogUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopifyStoreUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ShopifyLogUpdateManyWithoutShopNestedInput
  }

  export type ShopifyStoreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ShopifyLogUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopifyStoreCreateManyInput = {
    id?: number
    companyId: number
    shop: string
    accessToken?: string | null
    scope?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyStoreUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyStoreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogCreateInput = {
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    shop: ShopifyStoreCreateNestedOneWithoutLogsInput
  }

  export type ShopifyLogUncheckedCreateInput = {
    id?: number
    shopId: number
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ShopifyLogUpdateInput = {
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopifyStoreUpdateOneRequiredWithoutLogsNestedInput
  }

  export type ShopifyLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogCreateManyInput = {
    id?: number
    shopId: number
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ShopifyLogUpdateManyMutationInput = {
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ShopifyLogListRelationFilter = {
    every?: ShopifyLogWhereInput
    some?: ShopifyLogWhereInput
    none?: ShopifyLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShopifyLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopifyStoreCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopifyStoreAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type ShopifyStoreMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopifyStoreMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopifyStoreSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ShopifyStoreRelationFilter = {
    is?: ShopifyStoreWhereInput
    isNot?: ShopifyStoreWhereInput
  }

  export type ShopifyLogCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    level?: SortOrder
    message?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopifyLogAvgOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
  }

  export type ShopifyLogMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    level?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopifyLogMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    level?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopifyLogSumOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ShopifyLogCreateNestedManyWithoutShopInput = {
    create?: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput> | ShopifyLogCreateWithoutShopInput[] | ShopifyLogUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ShopifyLogCreateOrConnectWithoutShopInput | ShopifyLogCreateOrConnectWithoutShopInput[]
    createMany?: ShopifyLogCreateManyShopInputEnvelope
    connect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
  }

  export type ShopifyLogUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput> | ShopifyLogCreateWithoutShopInput[] | ShopifyLogUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ShopifyLogCreateOrConnectWithoutShopInput | ShopifyLogCreateOrConnectWithoutShopInput[]
    createMany?: ShopifyLogCreateManyShopInputEnvelope
    connect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ShopifyLogUpdateManyWithoutShopNestedInput = {
    create?: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput> | ShopifyLogCreateWithoutShopInput[] | ShopifyLogUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ShopifyLogCreateOrConnectWithoutShopInput | ShopifyLogCreateOrConnectWithoutShopInput[]
    upsert?: ShopifyLogUpsertWithWhereUniqueWithoutShopInput | ShopifyLogUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ShopifyLogCreateManyShopInputEnvelope
    set?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    disconnect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    delete?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    connect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    update?: ShopifyLogUpdateWithWhereUniqueWithoutShopInput | ShopifyLogUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ShopifyLogUpdateManyWithWhereWithoutShopInput | ShopifyLogUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ShopifyLogScalarWhereInput | ShopifyLogScalarWhereInput[]
  }

  export type ShopifyLogUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput> | ShopifyLogCreateWithoutShopInput[] | ShopifyLogUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ShopifyLogCreateOrConnectWithoutShopInput | ShopifyLogCreateOrConnectWithoutShopInput[]
    upsert?: ShopifyLogUpsertWithWhereUniqueWithoutShopInput | ShopifyLogUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ShopifyLogCreateManyShopInputEnvelope
    set?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    disconnect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    delete?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    connect?: ShopifyLogWhereUniqueInput | ShopifyLogWhereUniqueInput[]
    update?: ShopifyLogUpdateWithWhereUniqueWithoutShopInput | ShopifyLogUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ShopifyLogUpdateManyWithWhereWithoutShopInput | ShopifyLogUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ShopifyLogScalarWhereInput | ShopifyLogScalarWhereInput[]
  }

  export type ShopifyStoreCreateNestedOneWithoutLogsInput = {
    create?: XOR<ShopifyStoreCreateWithoutLogsInput, ShopifyStoreUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ShopifyStoreCreateOrConnectWithoutLogsInput
    connect?: ShopifyStoreWhereUniqueInput
  }

  export type ShopifyStoreUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<ShopifyStoreCreateWithoutLogsInput, ShopifyStoreUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ShopifyStoreCreateOrConnectWithoutLogsInput
    upsert?: ShopifyStoreUpsertWithoutLogsInput
    connect?: ShopifyStoreWhereUniqueInput
    update?: XOR<XOR<ShopifyStoreUpdateToOneWithWhereWithoutLogsInput, ShopifyStoreUpdateWithoutLogsInput>, ShopifyStoreUncheckedUpdateWithoutLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ShopifyLogCreateWithoutShopInput = {
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ShopifyLogUncheckedCreateWithoutShopInput = {
    id?: number
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ShopifyLogCreateOrConnectWithoutShopInput = {
    where: ShopifyLogWhereUniqueInput
    create: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput>
  }

  export type ShopifyLogCreateManyShopInputEnvelope = {
    data: ShopifyLogCreateManyShopInput | ShopifyLogCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type ShopifyLogUpsertWithWhereUniqueWithoutShopInput = {
    where: ShopifyLogWhereUniqueInput
    update: XOR<ShopifyLogUpdateWithoutShopInput, ShopifyLogUncheckedUpdateWithoutShopInput>
    create: XOR<ShopifyLogCreateWithoutShopInput, ShopifyLogUncheckedCreateWithoutShopInput>
  }

  export type ShopifyLogUpdateWithWhereUniqueWithoutShopInput = {
    where: ShopifyLogWhereUniqueInput
    data: XOR<ShopifyLogUpdateWithoutShopInput, ShopifyLogUncheckedUpdateWithoutShopInput>
  }

  export type ShopifyLogUpdateManyWithWhereWithoutShopInput = {
    where: ShopifyLogScalarWhereInput
    data: XOR<ShopifyLogUpdateManyMutationInput, ShopifyLogUncheckedUpdateManyWithoutShopInput>
  }

  export type ShopifyLogScalarWhereInput = {
    AND?: ShopifyLogScalarWhereInput | ShopifyLogScalarWhereInput[]
    OR?: ShopifyLogScalarWhereInput[]
    NOT?: ShopifyLogScalarWhereInput | ShopifyLogScalarWhereInput[]
    id?: IntFilter<"ShopifyLog"> | number
    shopId?: IntFilter<"ShopifyLog"> | number
    level?: StringFilter<"ShopifyLog"> | string
    message?: StringFilter<"ShopifyLog"> | string
    payload?: JsonNullableFilter<"ShopifyLog">
    createdAt?: DateTimeFilter<"ShopifyLog"> | Date | string
  }

  export type ShopifyStoreCreateWithoutLogsInput = {
    companyId: number
    shop: string
    accessToken?: string | null
    scope?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyStoreUncheckedCreateWithoutLogsInput = {
    id?: number
    companyId: number
    shop: string
    accessToken?: string | null
    scope?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyStoreCreateOrConnectWithoutLogsInput = {
    where: ShopifyStoreWhereUniqueInput
    create: XOR<ShopifyStoreCreateWithoutLogsInput, ShopifyStoreUncheckedCreateWithoutLogsInput>
  }

  export type ShopifyStoreUpsertWithoutLogsInput = {
    update: XOR<ShopifyStoreUpdateWithoutLogsInput, ShopifyStoreUncheckedUpdateWithoutLogsInput>
    create: XOR<ShopifyStoreCreateWithoutLogsInput, ShopifyStoreUncheckedCreateWithoutLogsInput>
    where?: ShopifyStoreWhereInput
  }

  export type ShopifyStoreUpdateToOneWithWhereWithoutLogsInput = {
    where?: ShopifyStoreWhereInput
    data: XOR<ShopifyStoreUpdateWithoutLogsInput, ShopifyStoreUncheckedUpdateWithoutLogsInput>
  }

  export type ShopifyStoreUpdateWithoutLogsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyStoreUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogCreateManyShopInput = {
    id?: number
    level: string
    message: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ShopifyLogUpdateWithoutShopInput = {
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogUncheckedUpdateWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyLogUncheckedUpdateManyWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ShopifyStoreCountOutputTypeDefaultArgs instead
     */
    export type ShopifyStoreCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopifyStoreCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShopifyStoreDefaultArgs instead
     */
    export type ShopifyStoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopifyStoreDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShopifyLogDefaultArgs instead
     */
    export type ShopifyLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopifyLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}