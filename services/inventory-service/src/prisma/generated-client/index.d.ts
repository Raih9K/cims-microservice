
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
 * Model StockLevel
 * 
 */
export type StockLevel = $Result.DefaultSelection<Prisma.$StockLevelPayload>
/**
 * Model Warehouse
 * 
 */
export type Warehouse = $Result.DefaultSelection<Prisma.$WarehousePayload>
/**
 * Model StockTransaction
 * 
 */
export type StockTransaction = $Result.DefaultSelection<Prisma.$StockTransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TransactionType: {
  IN: 'IN',
  OUT: 'OUT',
  RESERVE: 'RESERVE',
  RELEASE: 'RELEASE',
  ADJUSTMENT: 'ADJUSTMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

}

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StockLevels
 * const stockLevels = await prisma.stockLevel.findMany()
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
   * // Fetch zero or more StockLevels
   * const stockLevels = await prisma.stockLevel.findMany()
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
   * `prisma.stockLevel`: Exposes CRUD operations for the **StockLevel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockLevels
    * const stockLevels = await prisma.stockLevel.findMany()
    * ```
    */
  get stockLevel(): Prisma.StockLevelDelegate<ExtArgs>;

  /**
   * `prisma.warehouse`: Exposes CRUD operations for the **Warehouse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warehouses
    * const warehouses = await prisma.warehouse.findMany()
    * ```
    */
  get warehouse(): Prisma.WarehouseDelegate<ExtArgs>;

  /**
   * `prisma.stockTransaction`: Exposes CRUD operations for the **StockTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockTransactions
    * const stockTransactions = await prisma.stockTransaction.findMany()
    * ```
    */
  get stockTransaction(): Prisma.StockTransactionDelegate<ExtArgs>;
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
    StockLevel: 'StockLevel',
    Warehouse: 'Warehouse',
    StockTransaction: 'StockTransaction'
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
      modelProps: "stockLevel" | "warehouse" | "stockTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StockLevel: {
        payload: Prisma.$StockLevelPayload<ExtArgs>
        fields: Prisma.StockLevelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockLevelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockLevelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          findFirst: {
            args: Prisma.StockLevelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockLevelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          findMany: {
            args: Prisma.StockLevelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>[]
          }
          create: {
            args: Prisma.StockLevelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          createMany: {
            args: Prisma.StockLevelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StockLevelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          update: {
            args: Prisma.StockLevelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          deleteMany: {
            args: Prisma.StockLevelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockLevelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockLevelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLevelPayload>
          }
          aggregate: {
            args: Prisma.StockLevelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockLevel>
          }
          groupBy: {
            args: Prisma.StockLevelGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockLevelGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockLevelCountArgs<ExtArgs>
            result: $Utils.Optional<StockLevelCountAggregateOutputType> | number
          }
        }
      }
      Warehouse: {
        payload: Prisma.$WarehousePayload<ExtArgs>
        fields: Prisma.WarehouseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WarehouseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WarehouseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          findFirst: {
            args: Prisma.WarehouseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WarehouseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          findMany: {
            args: Prisma.WarehouseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>[]
          }
          create: {
            args: Prisma.WarehouseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          createMany: {
            args: Prisma.WarehouseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WarehouseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          update: {
            args: Prisma.WarehouseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          deleteMany: {
            args: Prisma.WarehouseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WarehouseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WarehouseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarehousePayload>
          }
          aggregate: {
            args: Prisma.WarehouseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWarehouse>
          }
          groupBy: {
            args: Prisma.WarehouseGroupByArgs<ExtArgs>
            result: $Utils.Optional<WarehouseGroupByOutputType>[]
          }
          count: {
            args: Prisma.WarehouseCountArgs<ExtArgs>
            result: $Utils.Optional<WarehouseCountAggregateOutputType> | number
          }
        }
      }
      StockTransaction: {
        payload: Prisma.$StockTransactionPayload<ExtArgs>
        fields: Prisma.StockTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          findFirst: {
            args: Prisma.StockTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          findMany: {
            args: Prisma.StockTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>[]
          }
          create: {
            args: Prisma.StockTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          createMany: {
            args: Prisma.StockTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StockTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          update: {
            args: Prisma.StockTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          deleteMany: {
            args: Prisma.StockTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTransactionPayload>
          }
          aggregate: {
            args: Prisma.StockTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockTransaction>
          }
          groupBy: {
            args: Prisma.StockTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<StockTransactionCountAggregateOutputType> | number
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
   * Count Type StockLevelCountOutputType
   */

  export type StockLevelCountOutputType = {
    transactions: number
  }

  export type StockLevelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | StockLevelCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * StockLevelCountOutputType without action
   */
  export type StockLevelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevelCountOutputType
     */
    select?: StockLevelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockLevelCountOutputType without action
   */
  export type StockLevelCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockTransactionWhereInput
  }


  /**
   * Count Type WarehouseCountOutputType
   */

  export type WarehouseCountOutputType = {
    stockLevels: number
  }

  export type WarehouseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockLevels?: boolean | WarehouseCountOutputTypeCountStockLevelsArgs
  }

  // Custom InputTypes
  /**
   * WarehouseCountOutputType without action
   */
  export type WarehouseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarehouseCountOutputType
     */
    select?: WarehouseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WarehouseCountOutputType without action
   */
  export type WarehouseCountOutputTypeCountStockLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockLevelWhereInput
  }


  /**
   * Models
   */

  /**
   * Model StockLevel
   */

  export type AggregateStockLevel = {
    _count: StockLevelCountAggregateOutputType | null
    _avg: StockLevelAvgAggregateOutputType | null
    _sum: StockLevelSumAggregateOutputType | null
    _min: StockLevelMinAggregateOutputType | null
    _max: StockLevelMaxAggregateOutputType | null
  }

  export type StockLevelAvgAggregateOutputType = {
    id: number | null
    variantId: number | null
    companyId: number | null
    warehouseId: number | null
    quantity: number | null
    reserved: number | null
    safetyStock: number | null
    reorderLevel: number | null
  }

  export type StockLevelSumAggregateOutputType = {
    id: number | null
    variantId: number | null
    companyId: number | null
    warehouseId: number | null
    quantity: number | null
    reserved: number | null
    safetyStock: number | null
    reorderLevel: number | null
  }

  export type StockLevelMinAggregateOutputType = {
    id: number | null
    variantId: number | null
    companyId: number | null
    warehouseId: number | null
    quantity: number | null
    reserved: number | null
    safetyStock: number | null
    reorderLevel: number | null
    binLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockLevelMaxAggregateOutputType = {
    id: number | null
    variantId: number | null
    companyId: number | null
    warehouseId: number | null
    quantity: number | null
    reserved: number | null
    safetyStock: number | null
    reorderLevel: number | null
    binLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockLevelCountAggregateOutputType = {
    id: number
    variantId: number
    companyId: number
    warehouseId: number
    quantity: number
    reserved: number
    safetyStock: number
    reorderLevel: number
    binLocation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockLevelAvgAggregateInputType = {
    id?: true
    variantId?: true
    companyId?: true
    warehouseId?: true
    quantity?: true
    reserved?: true
    safetyStock?: true
    reorderLevel?: true
  }

  export type StockLevelSumAggregateInputType = {
    id?: true
    variantId?: true
    companyId?: true
    warehouseId?: true
    quantity?: true
    reserved?: true
    safetyStock?: true
    reorderLevel?: true
  }

  export type StockLevelMinAggregateInputType = {
    id?: true
    variantId?: true
    companyId?: true
    warehouseId?: true
    quantity?: true
    reserved?: true
    safetyStock?: true
    reorderLevel?: true
    binLocation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockLevelMaxAggregateInputType = {
    id?: true
    variantId?: true
    companyId?: true
    warehouseId?: true
    quantity?: true
    reserved?: true
    safetyStock?: true
    reorderLevel?: true
    binLocation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockLevelCountAggregateInputType = {
    id?: true
    variantId?: true
    companyId?: true
    warehouseId?: true
    quantity?: true
    reserved?: true
    safetyStock?: true
    reorderLevel?: true
    binLocation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockLevelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockLevel to aggregate.
     */
    where?: StockLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLevels to fetch.
     */
    orderBy?: StockLevelOrderByWithRelationInput | StockLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockLevels
    **/
    _count?: true | StockLevelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockLevelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockLevelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockLevelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockLevelMaxAggregateInputType
  }

  export type GetStockLevelAggregateType<T extends StockLevelAggregateArgs> = {
        [P in keyof T & keyof AggregateStockLevel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockLevel[P]>
      : GetScalarType<T[P], AggregateStockLevel[P]>
  }




  export type StockLevelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockLevelWhereInput
    orderBy?: StockLevelOrderByWithAggregationInput | StockLevelOrderByWithAggregationInput[]
    by: StockLevelScalarFieldEnum[] | StockLevelScalarFieldEnum
    having?: StockLevelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockLevelCountAggregateInputType | true
    _avg?: StockLevelAvgAggregateInputType
    _sum?: StockLevelSumAggregateInputType
    _min?: StockLevelMinAggregateInputType
    _max?: StockLevelMaxAggregateInputType
  }

  export type StockLevelGroupByOutputType = {
    id: number
    variantId: number
    companyId: number
    warehouseId: number | null
    quantity: number
    reserved: number
    safetyStock: number
    reorderLevel: number
    binLocation: string | null
    createdAt: Date
    updatedAt: Date
    _count: StockLevelCountAggregateOutputType | null
    _avg: StockLevelAvgAggregateOutputType | null
    _sum: StockLevelSumAggregateOutputType | null
    _min: StockLevelMinAggregateOutputType | null
    _max: StockLevelMaxAggregateOutputType | null
  }

  type GetStockLevelGroupByPayload<T extends StockLevelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockLevelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockLevelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockLevelGroupByOutputType[P]>
            : GetScalarType<T[P], StockLevelGroupByOutputType[P]>
        }
      >
    >


  export type StockLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variantId?: boolean
    companyId?: boolean
    warehouseId?: boolean
    quantity?: boolean
    reserved?: boolean
    safetyStock?: boolean
    reorderLevel?: boolean
    binLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    warehouse?: boolean | StockLevel$warehouseArgs<ExtArgs>
    transactions?: boolean | StockLevel$transactionsArgs<ExtArgs>
    _count?: boolean | StockLevelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockLevel"]>


  export type StockLevelSelectScalar = {
    id?: boolean
    variantId?: boolean
    companyId?: boolean
    warehouseId?: boolean
    quantity?: boolean
    reserved?: boolean
    safetyStock?: boolean
    reorderLevel?: boolean
    binLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockLevelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    warehouse?: boolean | StockLevel$warehouseArgs<ExtArgs>
    transactions?: boolean | StockLevel$transactionsArgs<ExtArgs>
    _count?: boolean | StockLevelCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StockLevelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockLevel"
    objects: {
      warehouse: Prisma.$WarehousePayload<ExtArgs> | null
      transactions: Prisma.$StockTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      variantId: number
      companyId: number
      warehouseId: number | null
      quantity: number
      reserved: number
      safetyStock: number
      reorderLevel: number
      binLocation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockLevel"]>
    composites: {}
  }

  type StockLevelGetPayload<S extends boolean | null | undefined | StockLevelDefaultArgs> = $Result.GetResult<Prisma.$StockLevelPayload, S>

  type StockLevelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockLevelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockLevelCountAggregateInputType | true
    }

  export interface StockLevelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockLevel'], meta: { name: 'StockLevel' } }
    /**
     * Find zero or one StockLevel that matches the filter.
     * @param {StockLevelFindUniqueArgs} args - Arguments to find a StockLevel
     * @example
     * // Get one StockLevel
     * const stockLevel = await prisma.stockLevel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockLevelFindUniqueArgs>(args: SelectSubset<T, StockLevelFindUniqueArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StockLevel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockLevelFindUniqueOrThrowArgs} args - Arguments to find a StockLevel
     * @example
     * // Get one StockLevel
     * const stockLevel = await prisma.stockLevel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockLevelFindUniqueOrThrowArgs>(args: SelectSubset<T, StockLevelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StockLevel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelFindFirstArgs} args - Arguments to find a StockLevel
     * @example
     * // Get one StockLevel
     * const stockLevel = await prisma.stockLevel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockLevelFindFirstArgs>(args?: SelectSubset<T, StockLevelFindFirstArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StockLevel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelFindFirstOrThrowArgs} args - Arguments to find a StockLevel
     * @example
     * // Get one StockLevel
     * const stockLevel = await prisma.stockLevel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockLevelFindFirstOrThrowArgs>(args?: SelectSubset<T, StockLevelFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StockLevels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockLevels
     * const stockLevels = await prisma.stockLevel.findMany()
     * 
     * // Get first 10 StockLevels
     * const stockLevels = await prisma.stockLevel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockLevelWithIdOnly = await prisma.stockLevel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockLevelFindManyArgs>(args?: SelectSubset<T, StockLevelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StockLevel.
     * @param {StockLevelCreateArgs} args - Arguments to create a StockLevel.
     * @example
     * // Create one StockLevel
     * const StockLevel = await prisma.stockLevel.create({
     *   data: {
     *     // ... data to create a StockLevel
     *   }
     * })
     * 
     */
    create<T extends StockLevelCreateArgs>(args: SelectSubset<T, StockLevelCreateArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StockLevels.
     * @param {StockLevelCreateManyArgs} args - Arguments to create many StockLevels.
     * @example
     * // Create many StockLevels
     * const stockLevel = await prisma.stockLevel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockLevelCreateManyArgs>(args?: SelectSubset<T, StockLevelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StockLevel.
     * @param {StockLevelDeleteArgs} args - Arguments to delete one StockLevel.
     * @example
     * // Delete one StockLevel
     * const StockLevel = await prisma.stockLevel.delete({
     *   where: {
     *     // ... filter to delete one StockLevel
     *   }
     * })
     * 
     */
    delete<T extends StockLevelDeleteArgs>(args: SelectSubset<T, StockLevelDeleteArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StockLevel.
     * @param {StockLevelUpdateArgs} args - Arguments to update one StockLevel.
     * @example
     * // Update one StockLevel
     * const stockLevel = await prisma.stockLevel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockLevelUpdateArgs>(args: SelectSubset<T, StockLevelUpdateArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StockLevels.
     * @param {StockLevelDeleteManyArgs} args - Arguments to filter StockLevels to delete.
     * @example
     * // Delete a few StockLevels
     * const { count } = await prisma.stockLevel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockLevelDeleteManyArgs>(args?: SelectSubset<T, StockLevelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockLevels
     * const stockLevel = await prisma.stockLevel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockLevelUpdateManyArgs>(args: SelectSubset<T, StockLevelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StockLevel.
     * @param {StockLevelUpsertArgs} args - Arguments to update or create a StockLevel.
     * @example
     * // Update or create a StockLevel
     * const stockLevel = await prisma.stockLevel.upsert({
     *   create: {
     *     // ... data to create a StockLevel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockLevel we want to update
     *   }
     * })
     */
    upsert<T extends StockLevelUpsertArgs>(args: SelectSubset<T, StockLevelUpsertArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StockLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelCountArgs} args - Arguments to filter StockLevels to count.
     * @example
     * // Count the number of StockLevels
     * const count = await prisma.stockLevel.count({
     *   where: {
     *     // ... the filter for the StockLevels we want to count
     *   }
     * })
    **/
    count<T extends StockLevelCountArgs>(
      args?: Subset<T, StockLevelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockLevelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockLevelAggregateArgs>(args: Subset<T, StockLevelAggregateArgs>): Prisma.PrismaPromise<GetStockLevelAggregateType<T>>

    /**
     * Group by StockLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLevelGroupByArgs} args - Group by arguments.
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
      T extends StockLevelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockLevelGroupByArgs['orderBy'] }
        : { orderBy?: StockLevelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockLevelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockLevelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockLevel model
   */
  readonly fields: StockLevelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockLevel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockLevelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    warehouse<T extends StockLevel$warehouseArgs<ExtArgs> = {}>(args?: Subset<T, StockLevel$warehouseArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    transactions<T extends StockLevel$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, StockLevel$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the StockLevel model
   */ 
  interface StockLevelFieldRefs {
    readonly id: FieldRef<"StockLevel", 'Int'>
    readonly variantId: FieldRef<"StockLevel", 'Int'>
    readonly companyId: FieldRef<"StockLevel", 'Int'>
    readonly warehouseId: FieldRef<"StockLevel", 'Int'>
    readonly quantity: FieldRef<"StockLevel", 'Int'>
    readonly reserved: FieldRef<"StockLevel", 'Int'>
    readonly safetyStock: FieldRef<"StockLevel", 'Int'>
    readonly reorderLevel: FieldRef<"StockLevel", 'Int'>
    readonly binLocation: FieldRef<"StockLevel", 'String'>
    readonly createdAt: FieldRef<"StockLevel", 'DateTime'>
    readonly updatedAt: FieldRef<"StockLevel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockLevel findUnique
   */
  export type StockLevelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter, which StockLevel to fetch.
     */
    where: StockLevelWhereUniqueInput
  }

  /**
   * StockLevel findUniqueOrThrow
   */
  export type StockLevelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter, which StockLevel to fetch.
     */
    where: StockLevelWhereUniqueInput
  }

  /**
   * StockLevel findFirst
   */
  export type StockLevelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter, which StockLevel to fetch.
     */
    where?: StockLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLevels to fetch.
     */
    orderBy?: StockLevelOrderByWithRelationInput | StockLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockLevels.
     */
    cursor?: StockLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockLevels.
     */
    distinct?: StockLevelScalarFieldEnum | StockLevelScalarFieldEnum[]
  }

  /**
   * StockLevel findFirstOrThrow
   */
  export type StockLevelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter, which StockLevel to fetch.
     */
    where?: StockLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLevels to fetch.
     */
    orderBy?: StockLevelOrderByWithRelationInput | StockLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockLevels.
     */
    cursor?: StockLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockLevels.
     */
    distinct?: StockLevelScalarFieldEnum | StockLevelScalarFieldEnum[]
  }

  /**
   * StockLevel findMany
   */
  export type StockLevelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter, which StockLevels to fetch.
     */
    where?: StockLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLevels to fetch.
     */
    orderBy?: StockLevelOrderByWithRelationInput | StockLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockLevels.
     */
    cursor?: StockLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLevels.
     */
    skip?: number
    distinct?: StockLevelScalarFieldEnum | StockLevelScalarFieldEnum[]
  }

  /**
   * StockLevel create
   */
  export type StockLevelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * The data needed to create a StockLevel.
     */
    data: XOR<StockLevelCreateInput, StockLevelUncheckedCreateInput>
  }

  /**
   * StockLevel createMany
   */
  export type StockLevelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockLevels.
     */
    data: StockLevelCreateManyInput | StockLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockLevel update
   */
  export type StockLevelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * The data needed to update a StockLevel.
     */
    data: XOR<StockLevelUpdateInput, StockLevelUncheckedUpdateInput>
    /**
     * Choose, which StockLevel to update.
     */
    where: StockLevelWhereUniqueInput
  }

  /**
   * StockLevel updateMany
   */
  export type StockLevelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockLevels.
     */
    data: XOR<StockLevelUpdateManyMutationInput, StockLevelUncheckedUpdateManyInput>
    /**
     * Filter which StockLevels to update
     */
    where?: StockLevelWhereInput
  }

  /**
   * StockLevel upsert
   */
  export type StockLevelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * The filter to search for the StockLevel to update in case it exists.
     */
    where: StockLevelWhereUniqueInput
    /**
     * In case the StockLevel found by the `where` argument doesn't exist, create a new StockLevel with this data.
     */
    create: XOR<StockLevelCreateInput, StockLevelUncheckedCreateInput>
    /**
     * In case the StockLevel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockLevelUpdateInput, StockLevelUncheckedUpdateInput>
  }

  /**
   * StockLevel delete
   */
  export type StockLevelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    /**
     * Filter which StockLevel to delete.
     */
    where: StockLevelWhereUniqueInput
  }

  /**
   * StockLevel deleteMany
   */
  export type StockLevelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockLevels to delete
     */
    where?: StockLevelWhereInput
  }

  /**
   * StockLevel.warehouse
   */
  export type StockLevel$warehouseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    where?: WarehouseWhereInput
  }

  /**
   * StockLevel.transactions
   */
  export type StockLevel$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    where?: StockTransactionWhereInput
    orderBy?: StockTransactionOrderByWithRelationInput | StockTransactionOrderByWithRelationInput[]
    cursor?: StockTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockTransactionScalarFieldEnum | StockTransactionScalarFieldEnum[]
  }

  /**
   * StockLevel without action
   */
  export type StockLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
  }


  /**
   * Model Warehouse
   */

  export type AggregateWarehouse = {
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  export type WarehouseAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type WarehouseSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type WarehouseMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    address: string | null
    city: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarehouseMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    address: string | null
    city: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarehouseCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    address: number
    city: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WarehouseAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type WarehouseSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type WarehouseMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    address?: true
    city?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarehouseMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    address?: true
    city?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarehouseCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    address?: true
    city?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WarehouseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warehouse to aggregate.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Warehouses
    **/
    _count?: true | WarehouseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarehouseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarehouseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarehouseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarehouseMaxAggregateInputType
  }

  export type GetWarehouseAggregateType<T extends WarehouseAggregateArgs> = {
        [P in keyof T & keyof AggregateWarehouse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarehouse[P]>
      : GetScalarType<T[P], AggregateWarehouse[P]>
  }




  export type WarehouseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WarehouseWhereInput
    orderBy?: WarehouseOrderByWithAggregationInput | WarehouseOrderByWithAggregationInput[]
    by: WarehouseScalarFieldEnum[] | WarehouseScalarFieldEnum
    having?: WarehouseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarehouseCountAggregateInputType | true
    _avg?: WarehouseAvgAggregateInputType
    _sum?: WarehouseSumAggregateInputType
    _min?: WarehouseMinAggregateInputType
    _max?: WarehouseMaxAggregateInputType
  }

  export type WarehouseGroupByOutputType = {
    id: number
    companyId: number
    name: string
    address: string | null
    city: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: WarehouseCountAggregateOutputType | null
    _avg: WarehouseAvgAggregateOutputType | null
    _sum: WarehouseSumAggregateOutputType | null
    _min: WarehouseMinAggregateOutputType | null
    _max: WarehouseMaxAggregateOutputType | null
  }

  type GetWarehouseGroupByPayload<T extends WarehouseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WarehouseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarehouseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
            : GetScalarType<T[P], WarehouseGroupByOutputType[P]>
        }
      >
    >


  export type WarehouseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stockLevels?: boolean | Warehouse$stockLevelsArgs<ExtArgs>
    _count?: boolean | WarehouseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["warehouse"]>


  export type WarehouseSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WarehouseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockLevels?: boolean | Warehouse$stockLevelsArgs<ExtArgs>
    _count?: boolean | WarehouseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $WarehousePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Warehouse"
    objects: {
      stockLevels: Prisma.$StockLevelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      address: string | null
      city: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["warehouse"]>
    composites: {}
  }

  type WarehouseGetPayload<S extends boolean | null | undefined | WarehouseDefaultArgs> = $Result.GetResult<Prisma.$WarehousePayload, S>

  type WarehouseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WarehouseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WarehouseCountAggregateInputType | true
    }

  export interface WarehouseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Warehouse'], meta: { name: 'Warehouse' } }
    /**
     * Find zero or one Warehouse that matches the filter.
     * @param {WarehouseFindUniqueArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WarehouseFindUniqueArgs>(args: SelectSubset<T, WarehouseFindUniqueArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Warehouse that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WarehouseFindUniqueOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WarehouseFindUniqueOrThrowArgs>(args: SelectSubset<T, WarehouseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Warehouse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WarehouseFindFirstArgs>(args?: SelectSubset<T, WarehouseFindFirstArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Warehouse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindFirstOrThrowArgs} args - Arguments to find a Warehouse
     * @example
     * // Get one Warehouse
     * const warehouse = await prisma.warehouse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WarehouseFindFirstOrThrowArgs>(args?: SelectSubset<T, WarehouseFindFirstOrThrowArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Warehouses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warehouses
     * const warehouses = await prisma.warehouse.findMany()
     * 
     * // Get first 10 Warehouses
     * const warehouses = await prisma.warehouse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warehouseWithIdOnly = await prisma.warehouse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WarehouseFindManyArgs>(args?: SelectSubset<T, WarehouseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Warehouse.
     * @param {WarehouseCreateArgs} args - Arguments to create a Warehouse.
     * @example
     * // Create one Warehouse
     * const Warehouse = await prisma.warehouse.create({
     *   data: {
     *     // ... data to create a Warehouse
     *   }
     * })
     * 
     */
    create<T extends WarehouseCreateArgs>(args: SelectSubset<T, WarehouseCreateArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Warehouses.
     * @param {WarehouseCreateManyArgs} args - Arguments to create many Warehouses.
     * @example
     * // Create many Warehouses
     * const warehouse = await prisma.warehouse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WarehouseCreateManyArgs>(args?: SelectSubset<T, WarehouseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Warehouse.
     * @param {WarehouseDeleteArgs} args - Arguments to delete one Warehouse.
     * @example
     * // Delete one Warehouse
     * const Warehouse = await prisma.warehouse.delete({
     *   where: {
     *     // ... filter to delete one Warehouse
     *   }
     * })
     * 
     */
    delete<T extends WarehouseDeleteArgs>(args: SelectSubset<T, WarehouseDeleteArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Warehouse.
     * @param {WarehouseUpdateArgs} args - Arguments to update one Warehouse.
     * @example
     * // Update one Warehouse
     * const warehouse = await prisma.warehouse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WarehouseUpdateArgs>(args: SelectSubset<T, WarehouseUpdateArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Warehouses.
     * @param {WarehouseDeleteManyArgs} args - Arguments to filter Warehouses to delete.
     * @example
     * // Delete a few Warehouses
     * const { count } = await prisma.warehouse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WarehouseDeleteManyArgs>(args?: SelectSubset<T, WarehouseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warehouses
     * const warehouse = await prisma.warehouse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WarehouseUpdateManyArgs>(args: SelectSubset<T, WarehouseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Warehouse.
     * @param {WarehouseUpsertArgs} args - Arguments to update or create a Warehouse.
     * @example
     * // Update or create a Warehouse
     * const warehouse = await prisma.warehouse.upsert({
     *   create: {
     *     // ... data to create a Warehouse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warehouse we want to update
     *   }
     * })
     */
    upsert<T extends WarehouseUpsertArgs>(args: SelectSubset<T, WarehouseUpsertArgs<ExtArgs>>): Prisma__WarehouseClient<$Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseCountArgs} args - Arguments to filter Warehouses to count.
     * @example
     * // Count the number of Warehouses
     * const count = await prisma.warehouse.count({
     *   where: {
     *     // ... the filter for the Warehouses we want to count
     *   }
     * })
    **/
    count<T extends WarehouseCountArgs>(
      args?: Subset<T, WarehouseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarehouseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WarehouseAggregateArgs>(args: Subset<T, WarehouseAggregateArgs>): Prisma.PrismaPromise<GetWarehouseAggregateType<T>>

    /**
     * Group by Warehouse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehouseGroupByArgs} args - Group by arguments.
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
      T extends WarehouseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarehouseGroupByArgs['orderBy'] }
        : { orderBy?: WarehouseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WarehouseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehouseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Warehouse model
   */
  readonly fields: WarehouseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Warehouse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WarehouseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stockLevels<T extends Warehouse$stockLevelsArgs<ExtArgs> = {}>(args?: Subset<T, Warehouse$stockLevelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Warehouse model
   */ 
  interface WarehouseFieldRefs {
    readonly id: FieldRef<"Warehouse", 'Int'>
    readonly companyId: FieldRef<"Warehouse", 'Int'>
    readonly name: FieldRef<"Warehouse", 'String'>
    readonly address: FieldRef<"Warehouse", 'String'>
    readonly city: FieldRef<"Warehouse", 'String'>
    readonly status: FieldRef<"Warehouse", 'String'>
    readonly createdAt: FieldRef<"Warehouse", 'DateTime'>
    readonly updatedAt: FieldRef<"Warehouse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Warehouse findUnique
   */
  export type WarehouseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse findUniqueOrThrow
   */
  export type WarehouseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse findFirst
   */
  export type WarehouseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse findFirstOrThrow
   */
  export type WarehouseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouse to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warehouses.
     */
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse findMany
   */
  export type WarehouseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter, which Warehouses to fetch.
     */
    where?: WarehouseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warehouses to fetch.
     */
    orderBy?: WarehouseOrderByWithRelationInput | WarehouseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Warehouses.
     */
    cursor?: WarehouseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warehouses.
     */
    skip?: number
    distinct?: WarehouseScalarFieldEnum | WarehouseScalarFieldEnum[]
  }

  /**
   * Warehouse create
   */
  export type WarehouseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The data needed to create a Warehouse.
     */
    data: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
  }

  /**
   * Warehouse createMany
   */
  export type WarehouseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Warehouses.
     */
    data: WarehouseCreateManyInput | WarehouseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Warehouse update
   */
  export type WarehouseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The data needed to update a Warehouse.
     */
    data: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
    /**
     * Choose, which Warehouse to update.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse updateMany
   */
  export type WarehouseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Warehouses.
     */
    data: XOR<WarehouseUpdateManyMutationInput, WarehouseUncheckedUpdateManyInput>
    /**
     * Filter which Warehouses to update
     */
    where?: WarehouseWhereInput
  }

  /**
   * Warehouse upsert
   */
  export type WarehouseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * The filter to search for the Warehouse to update in case it exists.
     */
    where: WarehouseWhereUniqueInput
    /**
     * In case the Warehouse found by the `where` argument doesn't exist, create a new Warehouse with this data.
     */
    create: XOR<WarehouseCreateInput, WarehouseUncheckedCreateInput>
    /**
     * In case the Warehouse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WarehouseUpdateInput, WarehouseUncheckedUpdateInput>
  }

  /**
   * Warehouse delete
   */
  export type WarehouseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
    /**
     * Filter which Warehouse to delete.
     */
    where: WarehouseWhereUniqueInput
  }

  /**
   * Warehouse deleteMany
   */
  export type WarehouseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warehouses to delete
     */
    where?: WarehouseWhereInput
  }

  /**
   * Warehouse.stockLevels
   */
  export type Warehouse$stockLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLevel
     */
    select?: StockLevelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockLevelInclude<ExtArgs> | null
    where?: StockLevelWhereInput
    orderBy?: StockLevelOrderByWithRelationInput | StockLevelOrderByWithRelationInput[]
    cursor?: StockLevelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockLevelScalarFieldEnum | StockLevelScalarFieldEnum[]
  }

  /**
   * Warehouse without action
   */
  export type WarehouseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warehouse
     */
    select?: WarehouseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarehouseInclude<ExtArgs> | null
  }


  /**
   * Model StockTransaction
   */

  export type AggregateStockTransaction = {
    _count: StockTransactionCountAggregateOutputType | null
    _avg: StockTransactionAvgAggregateOutputType | null
    _sum: StockTransactionSumAggregateOutputType | null
    _min: StockTransactionMinAggregateOutputType | null
    _max: StockTransactionMaxAggregateOutputType | null
  }

  export type StockTransactionAvgAggregateOutputType = {
    id: number | null
    stockLevelId: number | null
    quantity: number | null
  }

  export type StockTransactionSumAggregateOutputType = {
    id: number | null
    stockLevelId: number | null
    quantity: number | null
  }

  export type StockTransactionMinAggregateOutputType = {
    id: number | null
    stockLevelId: number | null
    type: $Enums.TransactionType | null
    quantity: number | null
    reason: string | null
    createdAt: Date | null
  }

  export type StockTransactionMaxAggregateOutputType = {
    id: number | null
    stockLevelId: number | null
    type: $Enums.TransactionType | null
    quantity: number | null
    reason: string | null
    createdAt: Date | null
  }

  export type StockTransactionCountAggregateOutputType = {
    id: number
    stockLevelId: number
    type: number
    quantity: number
    reason: number
    createdAt: number
    _all: number
  }


  export type StockTransactionAvgAggregateInputType = {
    id?: true
    stockLevelId?: true
    quantity?: true
  }

  export type StockTransactionSumAggregateInputType = {
    id?: true
    stockLevelId?: true
    quantity?: true
  }

  export type StockTransactionMinAggregateInputType = {
    id?: true
    stockLevelId?: true
    type?: true
    quantity?: true
    reason?: true
    createdAt?: true
  }

  export type StockTransactionMaxAggregateInputType = {
    id?: true
    stockLevelId?: true
    type?: true
    quantity?: true
    reason?: true
    createdAt?: true
  }

  export type StockTransactionCountAggregateInputType = {
    id?: true
    stockLevelId?: true
    type?: true
    quantity?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type StockTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockTransaction to aggregate.
     */
    where?: StockTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTransactions to fetch.
     */
    orderBy?: StockTransactionOrderByWithRelationInput | StockTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockTransactions
    **/
    _count?: true | StockTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockTransactionMaxAggregateInputType
  }

  export type GetStockTransactionAggregateType<T extends StockTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateStockTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockTransaction[P]>
      : GetScalarType<T[P], AggregateStockTransaction[P]>
  }




  export type StockTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockTransactionWhereInput
    orderBy?: StockTransactionOrderByWithAggregationInput | StockTransactionOrderByWithAggregationInput[]
    by: StockTransactionScalarFieldEnum[] | StockTransactionScalarFieldEnum
    having?: StockTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockTransactionCountAggregateInputType | true
    _avg?: StockTransactionAvgAggregateInputType
    _sum?: StockTransactionSumAggregateInputType
    _min?: StockTransactionMinAggregateInputType
    _max?: StockTransactionMaxAggregateInputType
  }

  export type StockTransactionGroupByOutputType = {
    id: number
    stockLevelId: number
    type: $Enums.TransactionType
    quantity: number
    reason: string | null
    createdAt: Date
    _count: StockTransactionCountAggregateOutputType | null
    _avg: StockTransactionAvgAggregateOutputType | null
    _sum: StockTransactionSumAggregateOutputType | null
    _min: StockTransactionMinAggregateOutputType | null
    _max: StockTransactionMaxAggregateOutputType | null
  }

  type GetStockTransactionGroupByPayload<T extends StockTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], StockTransactionGroupByOutputType[P]>
        }
      >
    >


  export type StockTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockLevelId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    createdAt?: boolean
    stockLevel?: boolean | StockLevelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockTransaction"]>


  export type StockTransactionSelectScalar = {
    id?: boolean
    stockLevelId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type StockTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockLevel?: boolean | StockLevelDefaultArgs<ExtArgs>
  }

  export type $StockTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockTransaction"
    objects: {
      stockLevel: Prisma.$StockLevelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      stockLevelId: number
      type: $Enums.TransactionType
      quantity: number
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["stockTransaction"]>
    composites: {}
  }

  type StockTransactionGetPayload<S extends boolean | null | undefined | StockTransactionDefaultArgs> = $Result.GetResult<Prisma.$StockTransactionPayload, S>

  type StockTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockTransactionCountAggregateInputType | true
    }

  export interface StockTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockTransaction'], meta: { name: 'StockTransaction' } }
    /**
     * Find zero or one StockTransaction that matches the filter.
     * @param {StockTransactionFindUniqueArgs} args - Arguments to find a StockTransaction
     * @example
     * // Get one StockTransaction
     * const stockTransaction = await prisma.stockTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockTransactionFindUniqueArgs>(args: SelectSubset<T, StockTransactionFindUniqueArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StockTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockTransactionFindUniqueOrThrowArgs} args - Arguments to find a StockTransaction
     * @example
     * // Get one StockTransaction
     * const stockTransaction = await prisma.stockTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, StockTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StockTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionFindFirstArgs} args - Arguments to find a StockTransaction
     * @example
     * // Get one StockTransaction
     * const stockTransaction = await prisma.stockTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockTransactionFindFirstArgs>(args?: SelectSubset<T, StockTransactionFindFirstArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StockTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionFindFirstOrThrowArgs} args - Arguments to find a StockTransaction
     * @example
     * // Get one StockTransaction
     * const stockTransaction = await prisma.stockTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, StockTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StockTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockTransactions
     * const stockTransactions = await prisma.stockTransaction.findMany()
     * 
     * // Get first 10 StockTransactions
     * const stockTransactions = await prisma.stockTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockTransactionWithIdOnly = await prisma.stockTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockTransactionFindManyArgs>(args?: SelectSubset<T, StockTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StockTransaction.
     * @param {StockTransactionCreateArgs} args - Arguments to create a StockTransaction.
     * @example
     * // Create one StockTransaction
     * const StockTransaction = await prisma.stockTransaction.create({
     *   data: {
     *     // ... data to create a StockTransaction
     *   }
     * })
     * 
     */
    create<T extends StockTransactionCreateArgs>(args: SelectSubset<T, StockTransactionCreateArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StockTransactions.
     * @param {StockTransactionCreateManyArgs} args - Arguments to create many StockTransactions.
     * @example
     * // Create many StockTransactions
     * const stockTransaction = await prisma.stockTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockTransactionCreateManyArgs>(args?: SelectSubset<T, StockTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StockTransaction.
     * @param {StockTransactionDeleteArgs} args - Arguments to delete one StockTransaction.
     * @example
     * // Delete one StockTransaction
     * const StockTransaction = await prisma.stockTransaction.delete({
     *   where: {
     *     // ... filter to delete one StockTransaction
     *   }
     * })
     * 
     */
    delete<T extends StockTransactionDeleteArgs>(args: SelectSubset<T, StockTransactionDeleteArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StockTransaction.
     * @param {StockTransactionUpdateArgs} args - Arguments to update one StockTransaction.
     * @example
     * // Update one StockTransaction
     * const stockTransaction = await prisma.stockTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockTransactionUpdateArgs>(args: SelectSubset<T, StockTransactionUpdateArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StockTransactions.
     * @param {StockTransactionDeleteManyArgs} args - Arguments to filter StockTransactions to delete.
     * @example
     * // Delete a few StockTransactions
     * const { count } = await prisma.stockTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockTransactionDeleteManyArgs>(args?: SelectSubset<T, StockTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockTransactions
     * const stockTransaction = await prisma.stockTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockTransactionUpdateManyArgs>(args: SelectSubset<T, StockTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StockTransaction.
     * @param {StockTransactionUpsertArgs} args - Arguments to update or create a StockTransaction.
     * @example
     * // Update or create a StockTransaction
     * const stockTransaction = await prisma.stockTransaction.upsert({
     *   create: {
     *     // ... data to create a StockTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockTransaction we want to update
     *   }
     * })
     */
    upsert<T extends StockTransactionUpsertArgs>(args: SelectSubset<T, StockTransactionUpsertArgs<ExtArgs>>): Prisma__StockTransactionClient<$Result.GetResult<Prisma.$StockTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StockTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionCountArgs} args - Arguments to filter StockTransactions to count.
     * @example
     * // Count the number of StockTransactions
     * const count = await prisma.stockTransaction.count({
     *   where: {
     *     // ... the filter for the StockTransactions we want to count
     *   }
     * })
    **/
    count<T extends StockTransactionCountArgs>(
      args?: Subset<T, StockTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockTransactionAggregateArgs>(args: Subset<T, StockTransactionAggregateArgs>): Prisma.PrismaPromise<GetStockTransactionAggregateType<T>>

    /**
     * Group by StockTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTransactionGroupByArgs} args - Group by arguments.
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
      T extends StockTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockTransactionGroupByArgs['orderBy'] }
        : { orderBy?: StockTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockTransaction model
   */
  readonly fields: StockTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stockLevel<T extends StockLevelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockLevelDefaultArgs<ExtArgs>>): Prisma__StockLevelClient<$Result.GetResult<Prisma.$StockLevelPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the StockTransaction model
   */ 
  interface StockTransactionFieldRefs {
    readonly id: FieldRef<"StockTransaction", 'Int'>
    readonly stockLevelId: FieldRef<"StockTransaction", 'Int'>
    readonly type: FieldRef<"StockTransaction", 'TransactionType'>
    readonly quantity: FieldRef<"StockTransaction", 'Int'>
    readonly reason: FieldRef<"StockTransaction", 'String'>
    readonly createdAt: FieldRef<"StockTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockTransaction findUnique
   */
  export type StockTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter, which StockTransaction to fetch.
     */
    where: StockTransactionWhereUniqueInput
  }

  /**
   * StockTransaction findUniqueOrThrow
   */
  export type StockTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter, which StockTransaction to fetch.
     */
    where: StockTransactionWhereUniqueInput
  }

  /**
   * StockTransaction findFirst
   */
  export type StockTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter, which StockTransaction to fetch.
     */
    where?: StockTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTransactions to fetch.
     */
    orderBy?: StockTransactionOrderByWithRelationInput | StockTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockTransactions.
     */
    cursor?: StockTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockTransactions.
     */
    distinct?: StockTransactionScalarFieldEnum | StockTransactionScalarFieldEnum[]
  }

  /**
   * StockTransaction findFirstOrThrow
   */
  export type StockTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter, which StockTransaction to fetch.
     */
    where?: StockTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTransactions to fetch.
     */
    orderBy?: StockTransactionOrderByWithRelationInput | StockTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockTransactions.
     */
    cursor?: StockTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockTransactions.
     */
    distinct?: StockTransactionScalarFieldEnum | StockTransactionScalarFieldEnum[]
  }

  /**
   * StockTransaction findMany
   */
  export type StockTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter, which StockTransactions to fetch.
     */
    where?: StockTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTransactions to fetch.
     */
    orderBy?: StockTransactionOrderByWithRelationInput | StockTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockTransactions.
     */
    cursor?: StockTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTransactions.
     */
    skip?: number
    distinct?: StockTransactionScalarFieldEnum | StockTransactionScalarFieldEnum[]
  }

  /**
   * StockTransaction create
   */
  export type StockTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a StockTransaction.
     */
    data: XOR<StockTransactionCreateInput, StockTransactionUncheckedCreateInput>
  }

  /**
   * StockTransaction createMany
   */
  export type StockTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockTransactions.
     */
    data: StockTransactionCreateManyInput | StockTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockTransaction update
   */
  export type StockTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a StockTransaction.
     */
    data: XOR<StockTransactionUpdateInput, StockTransactionUncheckedUpdateInput>
    /**
     * Choose, which StockTransaction to update.
     */
    where: StockTransactionWhereUniqueInput
  }

  /**
   * StockTransaction updateMany
   */
  export type StockTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockTransactions.
     */
    data: XOR<StockTransactionUpdateManyMutationInput, StockTransactionUncheckedUpdateManyInput>
    /**
     * Filter which StockTransactions to update
     */
    where?: StockTransactionWhereInput
  }

  /**
   * StockTransaction upsert
   */
  export type StockTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the StockTransaction to update in case it exists.
     */
    where: StockTransactionWhereUniqueInput
    /**
     * In case the StockTransaction found by the `where` argument doesn't exist, create a new StockTransaction with this data.
     */
    create: XOR<StockTransactionCreateInput, StockTransactionUncheckedCreateInput>
    /**
     * In case the StockTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockTransactionUpdateInput, StockTransactionUncheckedUpdateInput>
  }

  /**
   * StockTransaction delete
   */
  export type StockTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
    /**
     * Filter which StockTransaction to delete.
     */
    where: StockTransactionWhereUniqueInput
  }

  /**
   * StockTransaction deleteMany
   */
  export type StockTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockTransactions to delete
     */
    where?: StockTransactionWhereInput
  }

  /**
   * StockTransaction without action
   */
  export type StockTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTransaction
     */
    select?: StockTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTransactionInclude<ExtArgs> | null
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


  export const StockLevelScalarFieldEnum: {
    id: 'id',
    variantId: 'variantId',
    companyId: 'companyId',
    warehouseId: 'warehouseId',
    quantity: 'quantity',
    reserved: 'reserved',
    safetyStock: 'safetyStock',
    reorderLevel: 'reorderLevel',
    binLocation: 'binLocation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockLevelScalarFieldEnum = (typeof StockLevelScalarFieldEnum)[keyof typeof StockLevelScalarFieldEnum]


  export const WarehouseScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    address: 'address',
    city: 'city',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum]


  export const StockTransactionScalarFieldEnum: {
    id: 'id',
    stockLevelId: 'stockLevelId',
    type: 'type',
    quantity: 'quantity',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type StockTransactionScalarFieldEnum = (typeof StockTransactionScalarFieldEnum)[keyof typeof StockTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type StockLevelWhereInput = {
    AND?: StockLevelWhereInput | StockLevelWhereInput[]
    OR?: StockLevelWhereInput[]
    NOT?: StockLevelWhereInput | StockLevelWhereInput[]
    id?: IntFilter<"StockLevel"> | number
    variantId?: IntFilter<"StockLevel"> | number
    companyId?: IntFilter<"StockLevel"> | number
    warehouseId?: IntNullableFilter<"StockLevel"> | number | null
    quantity?: IntFilter<"StockLevel"> | number
    reserved?: IntFilter<"StockLevel"> | number
    safetyStock?: IntFilter<"StockLevel"> | number
    reorderLevel?: IntFilter<"StockLevel"> | number
    binLocation?: StringNullableFilter<"StockLevel"> | string | null
    createdAt?: DateTimeFilter<"StockLevel"> | Date | string
    updatedAt?: DateTimeFilter<"StockLevel"> | Date | string
    warehouse?: XOR<WarehouseNullableRelationFilter, WarehouseWhereInput> | null
    transactions?: StockTransactionListRelationFilter
  }

  export type StockLevelOrderByWithRelationInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrderInput | SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
    binLocation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    warehouse?: WarehouseOrderByWithRelationInput
    transactions?: StockTransactionOrderByRelationAggregateInput
  }

  export type StockLevelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    variantId?: number
    AND?: StockLevelWhereInput | StockLevelWhereInput[]
    OR?: StockLevelWhereInput[]
    NOT?: StockLevelWhereInput | StockLevelWhereInput[]
    companyId?: IntFilter<"StockLevel"> | number
    warehouseId?: IntNullableFilter<"StockLevel"> | number | null
    quantity?: IntFilter<"StockLevel"> | number
    reserved?: IntFilter<"StockLevel"> | number
    safetyStock?: IntFilter<"StockLevel"> | number
    reorderLevel?: IntFilter<"StockLevel"> | number
    binLocation?: StringNullableFilter<"StockLevel"> | string | null
    createdAt?: DateTimeFilter<"StockLevel"> | Date | string
    updatedAt?: DateTimeFilter<"StockLevel"> | Date | string
    warehouse?: XOR<WarehouseNullableRelationFilter, WarehouseWhereInput> | null
    transactions?: StockTransactionListRelationFilter
  }, "id" | "variantId">

  export type StockLevelOrderByWithAggregationInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrderInput | SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
    binLocation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockLevelCountOrderByAggregateInput
    _avg?: StockLevelAvgOrderByAggregateInput
    _max?: StockLevelMaxOrderByAggregateInput
    _min?: StockLevelMinOrderByAggregateInput
    _sum?: StockLevelSumOrderByAggregateInput
  }

  export type StockLevelScalarWhereWithAggregatesInput = {
    AND?: StockLevelScalarWhereWithAggregatesInput | StockLevelScalarWhereWithAggregatesInput[]
    OR?: StockLevelScalarWhereWithAggregatesInput[]
    NOT?: StockLevelScalarWhereWithAggregatesInput | StockLevelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StockLevel"> | number
    variantId?: IntWithAggregatesFilter<"StockLevel"> | number
    companyId?: IntWithAggregatesFilter<"StockLevel"> | number
    warehouseId?: IntNullableWithAggregatesFilter<"StockLevel"> | number | null
    quantity?: IntWithAggregatesFilter<"StockLevel"> | number
    reserved?: IntWithAggregatesFilter<"StockLevel"> | number
    safetyStock?: IntWithAggregatesFilter<"StockLevel"> | number
    reorderLevel?: IntWithAggregatesFilter<"StockLevel"> | number
    binLocation?: StringNullableWithAggregatesFilter<"StockLevel"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockLevel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockLevel"> | Date | string
  }

  export type WarehouseWhereInput = {
    AND?: WarehouseWhereInput | WarehouseWhereInput[]
    OR?: WarehouseWhereInput[]
    NOT?: WarehouseWhereInput | WarehouseWhereInput[]
    id?: IntFilter<"Warehouse"> | number
    companyId?: IntFilter<"Warehouse"> | number
    name?: StringFilter<"Warehouse"> | string
    address?: StringNullableFilter<"Warehouse"> | string | null
    city?: StringNullableFilter<"Warehouse"> | string | null
    status?: StringFilter<"Warehouse"> | string
    createdAt?: DateTimeFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeFilter<"Warehouse"> | Date | string
    stockLevels?: StockLevelListRelationFilter
  }

  export type WarehouseOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stockLevels?: StockLevelOrderByRelationAggregateInput
  }

  export type WarehouseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WarehouseWhereInput | WarehouseWhereInput[]
    OR?: WarehouseWhereInput[]
    NOT?: WarehouseWhereInput | WarehouseWhereInput[]
    companyId?: IntFilter<"Warehouse"> | number
    name?: StringFilter<"Warehouse"> | string
    address?: StringNullableFilter<"Warehouse"> | string | null
    city?: StringNullableFilter<"Warehouse"> | string | null
    status?: StringFilter<"Warehouse"> | string
    createdAt?: DateTimeFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeFilter<"Warehouse"> | Date | string
    stockLevels?: StockLevelListRelationFilter
  }, "id">

  export type WarehouseOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WarehouseCountOrderByAggregateInput
    _avg?: WarehouseAvgOrderByAggregateInput
    _max?: WarehouseMaxOrderByAggregateInput
    _min?: WarehouseMinOrderByAggregateInput
    _sum?: WarehouseSumOrderByAggregateInput
  }

  export type WarehouseScalarWhereWithAggregatesInput = {
    AND?: WarehouseScalarWhereWithAggregatesInput | WarehouseScalarWhereWithAggregatesInput[]
    OR?: WarehouseScalarWhereWithAggregatesInput[]
    NOT?: WarehouseScalarWhereWithAggregatesInput | WarehouseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Warehouse"> | number
    companyId?: IntWithAggregatesFilter<"Warehouse"> | number
    name?: StringWithAggregatesFilter<"Warehouse"> | string
    address?: StringNullableWithAggregatesFilter<"Warehouse"> | string | null
    city?: StringNullableWithAggregatesFilter<"Warehouse"> | string | null
    status?: StringWithAggregatesFilter<"Warehouse"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Warehouse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Warehouse"> | Date | string
  }

  export type StockTransactionWhereInput = {
    AND?: StockTransactionWhereInput | StockTransactionWhereInput[]
    OR?: StockTransactionWhereInput[]
    NOT?: StockTransactionWhereInput | StockTransactionWhereInput[]
    id?: IntFilter<"StockTransaction"> | number
    stockLevelId?: IntFilter<"StockTransaction"> | number
    type?: EnumTransactionTypeFilter<"StockTransaction"> | $Enums.TransactionType
    quantity?: IntFilter<"StockTransaction"> | number
    reason?: StringNullableFilter<"StockTransaction"> | string | null
    createdAt?: DateTimeFilter<"StockTransaction"> | Date | string
    stockLevel?: XOR<StockLevelRelationFilter, StockLevelWhereInput>
  }

  export type StockTransactionOrderByWithRelationInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stockLevel?: StockLevelOrderByWithRelationInput
  }

  export type StockTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StockTransactionWhereInput | StockTransactionWhereInput[]
    OR?: StockTransactionWhereInput[]
    NOT?: StockTransactionWhereInput | StockTransactionWhereInput[]
    stockLevelId?: IntFilter<"StockTransaction"> | number
    type?: EnumTransactionTypeFilter<"StockTransaction"> | $Enums.TransactionType
    quantity?: IntFilter<"StockTransaction"> | number
    reason?: StringNullableFilter<"StockTransaction"> | string | null
    createdAt?: DateTimeFilter<"StockTransaction"> | Date | string
    stockLevel?: XOR<StockLevelRelationFilter, StockLevelWhereInput>
  }, "id">

  export type StockTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StockTransactionCountOrderByAggregateInput
    _avg?: StockTransactionAvgOrderByAggregateInput
    _max?: StockTransactionMaxOrderByAggregateInput
    _min?: StockTransactionMinOrderByAggregateInput
    _sum?: StockTransactionSumOrderByAggregateInput
  }

  export type StockTransactionScalarWhereWithAggregatesInput = {
    AND?: StockTransactionScalarWhereWithAggregatesInput | StockTransactionScalarWhereWithAggregatesInput[]
    OR?: StockTransactionScalarWhereWithAggregatesInput[]
    NOT?: StockTransactionScalarWhereWithAggregatesInput | StockTransactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StockTransaction"> | number
    stockLevelId?: IntWithAggregatesFilter<"StockTransaction"> | number
    type?: EnumTransactionTypeWithAggregatesFilter<"StockTransaction"> | $Enums.TransactionType
    quantity?: IntWithAggregatesFilter<"StockTransaction"> | number
    reason?: StringNullableWithAggregatesFilter<"StockTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockTransaction"> | Date | string
  }

  export type StockLevelCreateInput = {
    variantId: number
    companyId: number
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    warehouse?: WarehouseCreateNestedOneWithoutStockLevelsInput
    transactions?: StockTransactionCreateNestedManyWithoutStockLevelInput
  }

  export type StockLevelUncheckedCreateInput = {
    id?: number
    variantId: number
    companyId: number
    warehouseId?: number | null
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: StockTransactionUncheckedCreateNestedManyWithoutStockLevelInput
  }

  export type StockLevelUpdateInput = {
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warehouse?: WarehouseUpdateOneWithoutStockLevelsNestedInput
    transactions?: StockTransactionUpdateManyWithoutStockLevelNestedInput
  }

  export type StockLevelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: StockTransactionUncheckedUpdateManyWithoutStockLevelNestedInput
  }

  export type StockLevelCreateManyInput = {
    id?: number
    variantId: number
    companyId: number
    warehouseId?: number | null
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockLevelUpdateManyMutationInput = {
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockLevelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarehouseCreateInput = {
    companyId: number
    name: string
    address?: string | null
    city?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockLevels?: StockLevelCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    address?: string | null
    city?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockLevels?: StockLevelUncheckedCreateNestedManyWithoutWarehouseInput
  }

  export type WarehouseUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockLevels?: StockLevelUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockLevels?: StockLevelUncheckedUpdateManyWithoutWarehouseNestedInput
  }

  export type WarehouseCreateManyInput = {
    id?: number
    companyId: number
    name: string
    address?: string | null
    city?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarehouseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionCreateInput = {
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
    stockLevel: StockLevelCreateNestedOneWithoutTransactionsInput
  }

  export type StockTransactionUncheckedCreateInput = {
    id?: number
    stockLevelId: number
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type StockTransactionUpdateInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockLevel?: StockLevelUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type StockTransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    stockLevelId?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionCreateManyInput = {
    id?: number
    stockLevelId: number
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type StockTransactionUpdateManyMutationInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    stockLevelId?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type WarehouseNullableRelationFilter = {
    is?: WarehouseWhereInput | null
    isNot?: WarehouseWhereInput | null
  }

  export type StockTransactionListRelationFilter = {
    every?: StockTransactionWhereInput
    some?: StockTransactionWhereInput
    none?: StockTransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StockTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockLevelCountOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
    binLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockLevelAvgOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
  }

  export type StockLevelMaxOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
    binLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockLevelMinOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
    binLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockLevelSumOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    companyId?: SortOrder
    warehouseId?: SortOrder
    quantity?: SortOrder
    reserved?: SortOrder
    safetyStock?: SortOrder
    reorderLevel?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type StockLevelListRelationFilter = {
    every?: StockLevelWhereInput
    some?: StockLevelWhereInput
    none?: StockLevelWhereInput
  }

  export type StockLevelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WarehouseCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type WarehouseMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarehouseSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
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

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type StockLevelRelationFilter = {
    is?: StockLevelWhereInput
    isNot?: StockLevelWhereInput
  }

  export type StockTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type StockTransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    quantity?: SortOrder
  }

  export type StockTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type StockTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type StockTransactionSumOrderByAggregateInput = {
    id?: SortOrder
    stockLevelId?: SortOrder
    quantity?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type WarehouseCreateNestedOneWithoutStockLevelsInput = {
    create?: XOR<WarehouseCreateWithoutStockLevelsInput, WarehouseUncheckedCreateWithoutStockLevelsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutStockLevelsInput
    connect?: WarehouseWhereUniqueInput
  }

  export type StockTransactionCreateNestedManyWithoutStockLevelInput = {
    create?: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput> | StockTransactionCreateWithoutStockLevelInput[] | StockTransactionUncheckedCreateWithoutStockLevelInput[]
    connectOrCreate?: StockTransactionCreateOrConnectWithoutStockLevelInput | StockTransactionCreateOrConnectWithoutStockLevelInput[]
    createMany?: StockTransactionCreateManyStockLevelInputEnvelope
    connect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
  }

  export type StockTransactionUncheckedCreateNestedManyWithoutStockLevelInput = {
    create?: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput> | StockTransactionCreateWithoutStockLevelInput[] | StockTransactionUncheckedCreateWithoutStockLevelInput[]
    connectOrCreate?: StockTransactionCreateOrConnectWithoutStockLevelInput | StockTransactionCreateOrConnectWithoutStockLevelInput[]
    createMany?: StockTransactionCreateManyStockLevelInputEnvelope
    connect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WarehouseUpdateOneWithoutStockLevelsNestedInput = {
    create?: XOR<WarehouseCreateWithoutStockLevelsInput, WarehouseUncheckedCreateWithoutStockLevelsInput>
    connectOrCreate?: WarehouseCreateOrConnectWithoutStockLevelsInput
    upsert?: WarehouseUpsertWithoutStockLevelsInput
    disconnect?: WarehouseWhereInput | boolean
    delete?: WarehouseWhereInput | boolean
    connect?: WarehouseWhereUniqueInput
    update?: XOR<XOR<WarehouseUpdateToOneWithWhereWithoutStockLevelsInput, WarehouseUpdateWithoutStockLevelsInput>, WarehouseUncheckedUpdateWithoutStockLevelsInput>
  }

  export type StockTransactionUpdateManyWithoutStockLevelNestedInput = {
    create?: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput> | StockTransactionCreateWithoutStockLevelInput[] | StockTransactionUncheckedCreateWithoutStockLevelInput[]
    connectOrCreate?: StockTransactionCreateOrConnectWithoutStockLevelInput | StockTransactionCreateOrConnectWithoutStockLevelInput[]
    upsert?: StockTransactionUpsertWithWhereUniqueWithoutStockLevelInput | StockTransactionUpsertWithWhereUniqueWithoutStockLevelInput[]
    createMany?: StockTransactionCreateManyStockLevelInputEnvelope
    set?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    disconnect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    delete?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    connect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    update?: StockTransactionUpdateWithWhereUniqueWithoutStockLevelInput | StockTransactionUpdateWithWhereUniqueWithoutStockLevelInput[]
    updateMany?: StockTransactionUpdateManyWithWhereWithoutStockLevelInput | StockTransactionUpdateManyWithWhereWithoutStockLevelInput[]
    deleteMany?: StockTransactionScalarWhereInput | StockTransactionScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StockTransactionUncheckedUpdateManyWithoutStockLevelNestedInput = {
    create?: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput> | StockTransactionCreateWithoutStockLevelInput[] | StockTransactionUncheckedCreateWithoutStockLevelInput[]
    connectOrCreate?: StockTransactionCreateOrConnectWithoutStockLevelInput | StockTransactionCreateOrConnectWithoutStockLevelInput[]
    upsert?: StockTransactionUpsertWithWhereUniqueWithoutStockLevelInput | StockTransactionUpsertWithWhereUniqueWithoutStockLevelInput[]
    createMany?: StockTransactionCreateManyStockLevelInputEnvelope
    set?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    disconnect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    delete?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    connect?: StockTransactionWhereUniqueInput | StockTransactionWhereUniqueInput[]
    update?: StockTransactionUpdateWithWhereUniqueWithoutStockLevelInput | StockTransactionUpdateWithWhereUniqueWithoutStockLevelInput[]
    updateMany?: StockTransactionUpdateManyWithWhereWithoutStockLevelInput | StockTransactionUpdateManyWithWhereWithoutStockLevelInput[]
    deleteMany?: StockTransactionScalarWhereInput | StockTransactionScalarWhereInput[]
  }

  export type StockLevelCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput> | StockLevelCreateWithoutWarehouseInput[] | StockLevelUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: StockLevelCreateOrConnectWithoutWarehouseInput | StockLevelCreateOrConnectWithoutWarehouseInput[]
    createMany?: StockLevelCreateManyWarehouseInputEnvelope
    connect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
  }

  export type StockLevelUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput> | StockLevelCreateWithoutWarehouseInput[] | StockLevelUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: StockLevelCreateOrConnectWithoutWarehouseInput | StockLevelCreateOrConnectWithoutWarehouseInput[]
    createMany?: StockLevelCreateManyWarehouseInputEnvelope
    connect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type StockLevelUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput> | StockLevelCreateWithoutWarehouseInput[] | StockLevelUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: StockLevelCreateOrConnectWithoutWarehouseInput | StockLevelCreateOrConnectWithoutWarehouseInput[]
    upsert?: StockLevelUpsertWithWhereUniqueWithoutWarehouseInput | StockLevelUpsertWithWhereUniqueWithoutWarehouseInput[]
    createMany?: StockLevelCreateManyWarehouseInputEnvelope
    set?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    disconnect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    delete?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    connect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    update?: StockLevelUpdateWithWhereUniqueWithoutWarehouseInput | StockLevelUpdateWithWhereUniqueWithoutWarehouseInput[]
    updateMany?: StockLevelUpdateManyWithWhereWithoutWarehouseInput | StockLevelUpdateManyWithWhereWithoutWarehouseInput[]
    deleteMany?: StockLevelScalarWhereInput | StockLevelScalarWhereInput[]
  }

  export type StockLevelUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput> | StockLevelCreateWithoutWarehouseInput[] | StockLevelUncheckedCreateWithoutWarehouseInput[]
    connectOrCreate?: StockLevelCreateOrConnectWithoutWarehouseInput | StockLevelCreateOrConnectWithoutWarehouseInput[]
    upsert?: StockLevelUpsertWithWhereUniqueWithoutWarehouseInput | StockLevelUpsertWithWhereUniqueWithoutWarehouseInput[]
    createMany?: StockLevelCreateManyWarehouseInputEnvelope
    set?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    disconnect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    delete?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    connect?: StockLevelWhereUniqueInput | StockLevelWhereUniqueInput[]
    update?: StockLevelUpdateWithWhereUniqueWithoutWarehouseInput | StockLevelUpdateWithWhereUniqueWithoutWarehouseInput[]
    updateMany?: StockLevelUpdateManyWithWhereWithoutWarehouseInput | StockLevelUpdateManyWithWhereWithoutWarehouseInput[]
    deleteMany?: StockLevelScalarWhereInput | StockLevelScalarWhereInput[]
  }

  export type StockLevelCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<StockLevelCreateWithoutTransactionsInput, StockLevelUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: StockLevelCreateOrConnectWithoutTransactionsInput
    connect?: StockLevelWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type StockLevelUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<StockLevelCreateWithoutTransactionsInput, StockLevelUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: StockLevelCreateOrConnectWithoutTransactionsInput
    upsert?: StockLevelUpsertWithoutTransactionsInput
    connect?: StockLevelWhereUniqueInput
    update?: XOR<XOR<StockLevelUpdateToOneWithWhereWithoutTransactionsInput, StockLevelUpdateWithoutTransactionsInput>, StockLevelUncheckedUpdateWithoutTransactionsInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type WarehouseCreateWithoutStockLevelsInput = {
    companyId: number
    name: string
    address?: string | null
    city?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseUncheckedCreateWithoutStockLevelsInput = {
    id?: number
    companyId: number
    name: string
    address?: string | null
    city?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarehouseCreateOrConnectWithoutStockLevelsInput = {
    where: WarehouseWhereUniqueInput
    create: XOR<WarehouseCreateWithoutStockLevelsInput, WarehouseUncheckedCreateWithoutStockLevelsInput>
  }

  export type StockTransactionCreateWithoutStockLevelInput = {
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type StockTransactionUncheckedCreateWithoutStockLevelInput = {
    id?: number
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type StockTransactionCreateOrConnectWithoutStockLevelInput = {
    where: StockTransactionWhereUniqueInput
    create: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput>
  }

  export type StockTransactionCreateManyStockLevelInputEnvelope = {
    data: StockTransactionCreateManyStockLevelInput | StockTransactionCreateManyStockLevelInput[]
    skipDuplicates?: boolean
  }

  export type WarehouseUpsertWithoutStockLevelsInput = {
    update: XOR<WarehouseUpdateWithoutStockLevelsInput, WarehouseUncheckedUpdateWithoutStockLevelsInput>
    create: XOR<WarehouseCreateWithoutStockLevelsInput, WarehouseUncheckedCreateWithoutStockLevelsInput>
    where?: WarehouseWhereInput
  }

  export type WarehouseUpdateToOneWithWhereWithoutStockLevelsInput = {
    where?: WarehouseWhereInput
    data: XOR<WarehouseUpdateWithoutStockLevelsInput, WarehouseUncheckedUpdateWithoutStockLevelsInput>
  }

  export type WarehouseUpdateWithoutStockLevelsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarehouseUncheckedUpdateWithoutStockLevelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionUpsertWithWhereUniqueWithoutStockLevelInput = {
    where: StockTransactionWhereUniqueInput
    update: XOR<StockTransactionUpdateWithoutStockLevelInput, StockTransactionUncheckedUpdateWithoutStockLevelInput>
    create: XOR<StockTransactionCreateWithoutStockLevelInput, StockTransactionUncheckedCreateWithoutStockLevelInput>
  }

  export type StockTransactionUpdateWithWhereUniqueWithoutStockLevelInput = {
    where: StockTransactionWhereUniqueInput
    data: XOR<StockTransactionUpdateWithoutStockLevelInput, StockTransactionUncheckedUpdateWithoutStockLevelInput>
  }

  export type StockTransactionUpdateManyWithWhereWithoutStockLevelInput = {
    where: StockTransactionScalarWhereInput
    data: XOR<StockTransactionUpdateManyMutationInput, StockTransactionUncheckedUpdateManyWithoutStockLevelInput>
  }

  export type StockTransactionScalarWhereInput = {
    AND?: StockTransactionScalarWhereInput | StockTransactionScalarWhereInput[]
    OR?: StockTransactionScalarWhereInput[]
    NOT?: StockTransactionScalarWhereInput | StockTransactionScalarWhereInput[]
    id?: IntFilter<"StockTransaction"> | number
    stockLevelId?: IntFilter<"StockTransaction"> | number
    type?: EnumTransactionTypeFilter<"StockTransaction"> | $Enums.TransactionType
    quantity?: IntFilter<"StockTransaction"> | number
    reason?: StringNullableFilter<"StockTransaction"> | string | null
    createdAt?: DateTimeFilter<"StockTransaction"> | Date | string
  }

  export type StockLevelCreateWithoutWarehouseInput = {
    variantId: number
    companyId: number
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: StockTransactionCreateNestedManyWithoutStockLevelInput
  }

  export type StockLevelUncheckedCreateWithoutWarehouseInput = {
    id?: number
    variantId: number
    companyId: number
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: StockTransactionUncheckedCreateNestedManyWithoutStockLevelInput
  }

  export type StockLevelCreateOrConnectWithoutWarehouseInput = {
    where: StockLevelWhereUniqueInput
    create: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput>
  }

  export type StockLevelCreateManyWarehouseInputEnvelope = {
    data: StockLevelCreateManyWarehouseInput | StockLevelCreateManyWarehouseInput[]
    skipDuplicates?: boolean
  }

  export type StockLevelUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: StockLevelWhereUniqueInput
    update: XOR<StockLevelUpdateWithoutWarehouseInput, StockLevelUncheckedUpdateWithoutWarehouseInput>
    create: XOR<StockLevelCreateWithoutWarehouseInput, StockLevelUncheckedCreateWithoutWarehouseInput>
  }

  export type StockLevelUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: StockLevelWhereUniqueInput
    data: XOR<StockLevelUpdateWithoutWarehouseInput, StockLevelUncheckedUpdateWithoutWarehouseInput>
  }

  export type StockLevelUpdateManyWithWhereWithoutWarehouseInput = {
    where: StockLevelScalarWhereInput
    data: XOR<StockLevelUpdateManyMutationInput, StockLevelUncheckedUpdateManyWithoutWarehouseInput>
  }

  export type StockLevelScalarWhereInput = {
    AND?: StockLevelScalarWhereInput | StockLevelScalarWhereInput[]
    OR?: StockLevelScalarWhereInput[]
    NOT?: StockLevelScalarWhereInput | StockLevelScalarWhereInput[]
    id?: IntFilter<"StockLevel"> | number
    variantId?: IntFilter<"StockLevel"> | number
    companyId?: IntFilter<"StockLevel"> | number
    warehouseId?: IntNullableFilter<"StockLevel"> | number | null
    quantity?: IntFilter<"StockLevel"> | number
    reserved?: IntFilter<"StockLevel"> | number
    safetyStock?: IntFilter<"StockLevel"> | number
    reorderLevel?: IntFilter<"StockLevel"> | number
    binLocation?: StringNullableFilter<"StockLevel"> | string | null
    createdAt?: DateTimeFilter<"StockLevel"> | Date | string
    updatedAt?: DateTimeFilter<"StockLevel"> | Date | string
  }

  export type StockLevelCreateWithoutTransactionsInput = {
    variantId: number
    companyId: number
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    warehouse?: WarehouseCreateNestedOneWithoutStockLevelsInput
  }

  export type StockLevelUncheckedCreateWithoutTransactionsInput = {
    id?: number
    variantId: number
    companyId: number
    warehouseId?: number | null
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockLevelCreateOrConnectWithoutTransactionsInput = {
    where: StockLevelWhereUniqueInput
    create: XOR<StockLevelCreateWithoutTransactionsInput, StockLevelUncheckedCreateWithoutTransactionsInput>
  }

  export type StockLevelUpsertWithoutTransactionsInput = {
    update: XOR<StockLevelUpdateWithoutTransactionsInput, StockLevelUncheckedUpdateWithoutTransactionsInput>
    create: XOR<StockLevelCreateWithoutTransactionsInput, StockLevelUncheckedCreateWithoutTransactionsInput>
    where?: StockLevelWhereInput
  }

  export type StockLevelUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: StockLevelWhereInput
    data: XOR<StockLevelUpdateWithoutTransactionsInput, StockLevelUncheckedUpdateWithoutTransactionsInput>
  }

  export type StockLevelUpdateWithoutTransactionsInput = {
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warehouse?: WarehouseUpdateOneWithoutStockLevelsNestedInput
  }

  export type StockLevelUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    warehouseId?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionCreateManyStockLevelInput = {
    id?: number
    type: $Enums.TransactionType
    quantity: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type StockTransactionUpdateWithoutStockLevelInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionUncheckedUpdateWithoutStockLevelInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTransactionUncheckedUpdateManyWithoutStockLevelInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockLevelCreateManyWarehouseInput = {
    id?: number
    variantId: number
    companyId: number
    quantity?: number
    reserved?: number
    safetyStock?: number
    reorderLevel?: number
    binLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockLevelUpdateWithoutWarehouseInput = {
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: StockTransactionUpdateManyWithoutStockLevelNestedInput
  }

  export type StockLevelUncheckedUpdateWithoutWarehouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: StockTransactionUncheckedUpdateManyWithoutStockLevelNestedInput
  }

  export type StockLevelUncheckedUpdateManyWithoutWarehouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    reserved?: IntFieldUpdateOperationsInput | number
    safetyStock?: IntFieldUpdateOperationsInput | number
    reorderLevel?: IntFieldUpdateOperationsInput | number
    binLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StockLevelCountOutputTypeDefaultArgs instead
     */
    export type StockLevelCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockLevelCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarehouseCountOutputTypeDefaultArgs instead
     */
    export type WarehouseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarehouseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockLevelDefaultArgs instead
     */
    export type StockLevelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockLevelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarehouseDefaultArgs instead
     */
    export type WarehouseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarehouseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockTransactionDefaultArgs instead
     */
    export type StockTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockTransactionDefaultArgs<ExtArgs>

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