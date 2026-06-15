
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
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductAttribute
 * 
 */
export type ProductAttribute = $Result.DefaultSelection<Prisma.$ProductAttributePayload>
/**
 * Model Variant
 * 
 */
export type Variant = $Result.DefaultSelection<Prisma.$VariantPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model VariantAttribute
 * 
 */
export type VariantAttribute = $Result.DefaultSelection<Prisma.$VariantAttributePayload>
/**
 * Model GlobalAttribute
 * 
 */
export type GlobalAttribute = $Result.DefaultSelection<Prisma.$GlobalAttributePayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model ProductSupplier
 * 
 */
export type ProductSupplier = $Result.DefaultSelection<Prisma.$ProductSupplierPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProductType: {
  SIMPLE: 'SIMPLE',
  VARIANT: 'VARIANT'
};

export type ProductType = (typeof ProductType)[keyof typeof ProductType]

}

export type ProductType = $Enums.ProductType

export const ProductType: typeof $Enums.ProductType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
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
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
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
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productAttribute`: Exposes CRUD operations for the **ProductAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductAttributes
    * const productAttributes = await prisma.productAttribute.findMany()
    * ```
    */
  get productAttribute(): Prisma.ProductAttributeDelegate<ExtArgs>;

  /**
   * `prisma.variant`: Exposes CRUD operations for the **Variant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Variants
    * const variants = await prisma.variant.findMany()
    * ```
    */
  get variant(): Prisma.VariantDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs>;

  /**
   * `prisma.variantAttribute`: Exposes CRUD operations for the **VariantAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VariantAttributes
    * const variantAttributes = await prisma.variantAttribute.findMany()
    * ```
    */
  get variantAttribute(): Prisma.VariantAttributeDelegate<ExtArgs>;

  /**
   * `prisma.globalAttribute`: Exposes CRUD operations for the **GlobalAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalAttributes
    * const globalAttributes = await prisma.globalAttribute.findMany()
    * ```
    */
  get globalAttribute(): Prisma.GlobalAttributeDelegate<ExtArgs>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs>;

  /**
   * `prisma.productSupplier`: Exposes CRUD operations for the **ProductSupplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductSuppliers
    * const productSuppliers = await prisma.productSupplier.findMany()
    * ```
    */
  get productSupplier(): Prisma.ProductSupplierDelegate<ExtArgs>;
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
    Product: 'Product',
    ProductAttribute: 'ProductAttribute',
    Variant: 'Variant',
    Category: 'Category',
    Brand: 'Brand',
    ProductImage: 'ProductImage',
    VariantAttribute: 'VariantAttribute',
    GlobalAttribute: 'GlobalAttribute',
    Supplier: 'Supplier',
    ProductSupplier: 'ProductSupplier'
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
      modelProps: "product" | "productAttribute" | "variant" | "category" | "brand" | "productImage" | "variantAttribute" | "globalAttribute" | "supplier" | "productSupplier"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductAttribute: {
        payload: Prisma.$ProductAttributePayload<ExtArgs>
        fields: Prisma.ProductAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          findFirst: {
            args: Prisma.ProductAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          findMany: {
            args: Prisma.ProductAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>[]
          }
          create: {
            args: Prisma.ProductAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          createMany: {
            args: Prisma.ProductAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          update: {
            args: Prisma.ProductAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          deleteMany: {
            args: Prisma.ProductAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          aggregate: {
            args: Prisma.ProductAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductAttribute>
          }
          groupBy: {
            args: Prisma.ProductAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeCountAggregateOutputType> | number
          }
        }
      }
      Variant: {
        payload: Prisma.$VariantPayload<ExtArgs>
        fields: Prisma.VariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findFirst: {
            args: Prisma.VariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findMany: {
            args: Prisma.VariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>[]
          }
          create: {
            args: Prisma.VariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          createMany: {
            args: Prisma.VariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          update: {
            args: Prisma.VariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          deleteMany: {
            args: Prisma.VariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          aggregate: {
            args: Prisma.VariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariant>
          }
          groupBy: {
            args: Prisma.VariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<VariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.VariantCountArgs<ExtArgs>
            result: $Utils.Optional<VariantCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Brand: {
        payload: Prisma.$BrandPayload<ExtArgs>
        fields: Prisma.BrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findFirst: {
            args: Prisma.BrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findMany: {
            args: Prisma.BrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          create: {
            args: Prisma.BrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          createMany: {
            args: Prisma.BrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          update: {
            args: Prisma.BrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          deleteMany: {
            args: Prisma.BrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.BrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      VariantAttribute: {
        payload: Prisma.$VariantAttributePayload<ExtArgs>
        fields: Prisma.VariantAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VariantAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VariantAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          findFirst: {
            args: Prisma.VariantAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VariantAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          findMany: {
            args: Prisma.VariantAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>[]
          }
          create: {
            args: Prisma.VariantAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          createMany: {
            args: Prisma.VariantAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VariantAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          update: {
            args: Prisma.VariantAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          deleteMany: {
            args: Prisma.VariantAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VariantAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VariantAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantAttributePayload>
          }
          aggregate: {
            args: Prisma.VariantAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariantAttribute>
          }
          groupBy: {
            args: Prisma.VariantAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VariantAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VariantAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<VariantAttributeCountAggregateOutputType> | number
          }
        }
      }
      GlobalAttribute: {
        payload: Prisma.$GlobalAttributePayload<ExtArgs>
        fields: Prisma.GlobalAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          findFirst: {
            args: Prisma.GlobalAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          findMany: {
            args: Prisma.GlobalAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>[]
          }
          create: {
            args: Prisma.GlobalAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          createMany: {
            args: Prisma.GlobalAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GlobalAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          update: {
            args: Prisma.GlobalAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          deleteMany: {
            args: Prisma.GlobalAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalAttributePayload>
          }
          aggregate: {
            args: Prisma.GlobalAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalAttribute>
          }
          groupBy: {
            args: Prisma.GlobalAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalAttributeCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      ProductSupplier: {
        payload: Prisma.$ProductSupplierPayload<ExtArgs>
        fields: Prisma.ProductSupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductSupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductSupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          findFirst: {
            args: Prisma.ProductSupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductSupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          findMany: {
            args: Prisma.ProductSupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>[]
          }
          create: {
            args: Prisma.ProductSupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          createMany: {
            args: Prisma.ProductSupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductSupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          update: {
            args: Prisma.ProductSupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          deleteMany: {
            args: Prisma.ProductSupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductSupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductSupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSupplierPayload>
          }
          aggregate: {
            args: Prisma.ProductSupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductSupplier>
          }
          groupBy: {
            args: Prisma.ProductSupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductSupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductSupplierCountArgs<ExtArgs>
            result: $Utils.Optional<ProductSupplierCountAggregateOutputType> | number
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
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number
    images: number
    suppliers: number
    attributes: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
    images?: boolean | ProductCountOutputTypeCountImagesArgs
    suppliers?: boolean | ProductCountOutputTypeCountSuppliersArgs
    attributes?: boolean | ProductCountOutputTypeCountAttributesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSuppliersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSupplierWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
  }


  /**
   * Count Type VariantCountOutputType
   */

  export type VariantCountOutputType = {
    attributes: number
  }

  export type VariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attributes?: boolean | VariantCountOutputTypeCountAttributesArgs
  }

  // Custom InputTypes
  /**
   * VariantCountOutputType without action
   */
  export type VariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantCountOutputType
     */
    select?: VariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VariantCountOutputType without action
   */
  export type VariantCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantAttributeWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    products: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | BrandCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     */
    select?: BrandCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    products: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | SupplierCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSupplierWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    msrp: Decimal | null
    purchasePrice: Decimal | null
    retailPrice: Decimal | null
    map: Decimal | null
    dimensionLength: Decimal | null
    dimensionWidth: Decimal | null
    dimensionHeight: Decimal | null
    weightValue: Decimal | null
    brandId: number | null
    categoryId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    companyId: number | null
    msrp: Decimal | null
    purchasePrice: Decimal | null
    retailPrice: Decimal | null
    map: Decimal | null
    dimensionLength: Decimal | null
    dimensionWidth: Decimal | null
    dimensionHeight: Decimal | null
    weightValue: Decimal | null
    brandId: number | null
    categoryId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    type: $Enums.ProductType | null
    sku: string | null
    productIdentifierType: string | null
    productIdentifierValue: string | null
    condition: string | null
    manufacturer: string | null
    status: string | null
    msrp: Decimal | null
    purchasePrice: Decimal | null
    retailPrice: Decimal | null
    map: Decimal | null
    dimensionLength: Decimal | null
    dimensionWidth: Decimal | null
    dimensionHeight: Decimal | null
    dimensionUnit: string | null
    weightValue: Decimal | null
    weightUnit: string | null
    manufacturedCountry: string | null
    manufacturedState: string | null
    manufacturedCity: string | null
    manufacturedPostalCode: string | null
    shortDescription: string | null
    mainDescription: string | null
    brandId: number | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    type: $Enums.ProductType | null
    sku: string | null
    productIdentifierType: string | null
    productIdentifierValue: string | null
    condition: string | null
    manufacturer: string | null
    status: string | null
    msrp: Decimal | null
    purchasePrice: Decimal | null
    retailPrice: Decimal | null
    map: Decimal | null
    dimensionLength: Decimal | null
    dimensionWidth: Decimal | null
    dimensionHeight: Decimal | null
    dimensionUnit: string | null
    weightValue: Decimal | null
    weightUnit: string | null
    manufacturedCountry: string | null
    manufacturedState: string | null
    manufacturedCity: string | null
    manufacturedPostalCode: string | null
    shortDescription: string | null
    mainDescription: string | null
    brandId: number | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    type: number
    sku: number
    productIdentifierType: number
    productIdentifierValue: number
    condition: number
    manufacturer: number
    status: number
    msrp: number
    purchasePrice: number
    retailPrice: number
    map: number
    dimensionLength: number
    dimensionWidth: number
    dimensionHeight: number
    dimensionUnit: number
    weightValue: number
    weightUnit: number
    manufacturedCountry: number
    manufacturedState: number
    manufacturedCity: number
    manufacturedPostalCode: number
    shortDescription: number
    mainDescription: number
    features: number
    brandId: number
    categoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    companyId?: true
    msrp?: true
    purchasePrice?: true
    retailPrice?: true
    map?: true
    dimensionLength?: true
    dimensionWidth?: true
    dimensionHeight?: true
    weightValue?: true
    brandId?: true
    categoryId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    companyId?: true
    msrp?: true
    purchasePrice?: true
    retailPrice?: true
    map?: true
    dimensionLength?: true
    dimensionWidth?: true
    dimensionHeight?: true
    weightValue?: true
    brandId?: true
    categoryId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    sku?: true
    productIdentifierType?: true
    productIdentifierValue?: true
    condition?: true
    manufacturer?: true
    status?: true
    msrp?: true
    purchasePrice?: true
    retailPrice?: true
    map?: true
    dimensionLength?: true
    dimensionWidth?: true
    dimensionHeight?: true
    dimensionUnit?: true
    weightValue?: true
    weightUnit?: true
    manufacturedCountry?: true
    manufacturedState?: true
    manufacturedCity?: true
    manufacturedPostalCode?: true
    shortDescription?: true
    mainDescription?: true
    brandId?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    sku?: true
    productIdentifierType?: true
    productIdentifierValue?: true
    condition?: true
    manufacturer?: true
    status?: true
    msrp?: true
    purchasePrice?: true
    retailPrice?: true
    map?: true
    dimensionLength?: true
    dimensionWidth?: true
    dimensionHeight?: true
    dimensionUnit?: true
    weightValue?: true
    weightUnit?: true
    manufacturedCountry?: true
    manufacturedState?: true
    manufacturedCity?: true
    manufacturedPostalCode?: true
    shortDescription?: true
    mainDescription?: true
    brandId?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    sku?: true
    productIdentifierType?: true
    productIdentifierValue?: true
    condition?: true
    manufacturer?: true
    status?: true
    msrp?: true
    purchasePrice?: true
    retailPrice?: true
    map?: true
    dimensionLength?: true
    dimensionWidth?: true
    dimensionHeight?: true
    dimensionUnit?: true
    weightValue?: true
    weightUnit?: true
    manufacturedCountry?: true
    manufacturedState?: true
    manufacturedCity?: true
    manufacturedPostalCode?: true
    shortDescription?: true
    mainDescription?: true
    features?: true
    brandId?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    companyId: number
    name: string
    type: $Enums.ProductType
    sku: string | null
    productIdentifierType: string | null
    productIdentifierValue: string | null
    condition: string | null
    manufacturer: string | null
    status: string
    msrp: Decimal | null
    purchasePrice: Decimal | null
    retailPrice: Decimal | null
    map: Decimal | null
    dimensionLength: Decimal | null
    dimensionWidth: Decimal | null
    dimensionHeight: Decimal | null
    dimensionUnit: string | null
    weightValue: Decimal | null
    weightUnit: string | null
    manufacturedCountry: string | null
    manufacturedState: string | null
    manufacturedCity: string | null
    manufacturedPostalCode: string | null
    shortDescription: string | null
    mainDescription: string | null
    features: JsonValue | null
    brandId: number | null
    categoryId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    type?: boolean
    sku?: boolean
    productIdentifierType?: boolean
    productIdentifierValue?: boolean
    condition?: boolean
    manufacturer?: boolean
    status?: boolean
    msrp?: boolean
    purchasePrice?: boolean
    retailPrice?: boolean
    map?: boolean
    dimensionLength?: boolean
    dimensionWidth?: boolean
    dimensionHeight?: boolean
    dimensionUnit?: boolean
    weightValue?: boolean
    weightUnit?: boolean
    manufacturedCountry?: boolean
    manufacturedState?: boolean
    manufacturedCity?: boolean
    manufacturedPostalCode?: boolean
    shortDescription?: boolean
    mainDescription?: boolean
    features?: boolean
    brandId?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | Product$brandArgs<ExtArgs>
    category?: boolean | Product$categoryArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    suppliers?: boolean | Product$suppliersArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>


  export type ProductSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    type?: boolean
    sku?: boolean
    productIdentifierType?: boolean
    productIdentifierValue?: boolean
    condition?: boolean
    manufacturer?: boolean
    status?: boolean
    msrp?: boolean
    purchasePrice?: boolean
    retailPrice?: boolean
    map?: boolean
    dimensionLength?: boolean
    dimensionWidth?: boolean
    dimensionHeight?: boolean
    dimensionUnit?: boolean
    weightValue?: boolean
    weightUnit?: boolean
    manufacturedCountry?: boolean
    manufacturedState?: boolean
    manufacturedCity?: boolean
    manufacturedPostalCode?: boolean
    shortDescription?: boolean
    mainDescription?: boolean
    features?: boolean
    brandId?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | Product$brandArgs<ExtArgs>
    category?: boolean | Product$categoryArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    suppliers?: boolean | Product$suppliersArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs> | null
      category: Prisma.$CategoryPayload<ExtArgs> | null
      variants: Prisma.$VariantPayload<ExtArgs>[]
      images: Prisma.$ProductImagePayload<ExtArgs>[]
      suppliers: Prisma.$ProductSupplierPayload<ExtArgs>[]
      attributes: Prisma.$ProductAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      type: $Enums.ProductType
      sku: string | null
      productIdentifierType: string | null
      productIdentifierValue: string | null
      condition: string | null
      manufacturer: string | null
      status: string
      msrp: Prisma.Decimal | null
      purchasePrice: Prisma.Decimal | null
      retailPrice: Prisma.Decimal | null
      map: Prisma.Decimal | null
      dimensionLength: Prisma.Decimal | null
      dimensionWidth: Prisma.Decimal | null
      dimensionHeight: Prisma.Decimal | null
      dimensionUnit: string | null
      weightValue: Prisma.Decimal | null
      weightUnit: string | null
      manufacturedCountry: string | null
      manufacturedState: string | null
      manufacturedCity: string | null
      manufacturedPostalCode: string | null
      shortDescription: string | null
      mainDescription: string | null
      features: Prisma.JsonValue | null
      brandId: number | null
      categoryId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends Product$brandArgs<ExtArgs> = {}>(args?: Subset<T, Product$brandArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    category<T extends Product$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany"> | Null>
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany"> | Null>
    suppliers<T extends Product$suppliersArgs<ExtArgs> = {}>(args?: Subset<T, Product$suppliersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findMany"> | Null>
    attributes<T extends Product$attributesArgs<ExtArgs> = {}>(args?: Subset<T, Product$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly companyId: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly type: FieldRef<"Product", 'ProductType'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly productIdentifierType: FieldRef<"Product", 'String'>
    readonly productIdentifierValue: FieldRef<"Product", 'String'>
    readonly condition: FieldRef<"Product", 'String'>
    readonly manufacturer: FieldRef<"Product", 'String'>
    readonly status: FieldRef<"Product", 'String'>
    readonly msrp: FieldRef<"Product", 'Decimal'>
    readonly purchasePrice: FieldRef<"Product", 'Decimal'>
    readonly retailPrice: FieldRef<"Product", 'Decimal'>
    readonly map: FieldRef<"Product", 'Decimal'>
    readonly dimensionLength: FieldRef<"Product", 'Decimal'>
    readonly dimensionWidth: FieldRef<"Product", 'Decimal'>
    readonly dimensionHeight: FieldRef<"Product", 'Decimal'>
    readonly dimensionUnit: FieldRef<"Product", 'String'>
    readonly weightValue: FieldRef<"Product", 'Decimal'>
    readonly weightUnit: FieldRef<"Product", 'String'>
    readonly manufacturedCountry: FieldRef<"Product", 'String'>
    readonly manufacturedState: FieldRef<"Product", 'String'>
    readonly manufacturedCity: FieldRef<"Product", 'String'>
    readonly manufacturedPostalCode: FieldRef<"Product", 'String'>
    readonly shortDescription: FieldRef<"Product", 'String'>
    readonly mainDescription: FieldRef<"Product", 'String'>
    readonly features: FieldRef<"Product", 'Json'>
    readonly brandId: FieldRef<"Product", 'Int'>
    readonly categoryId: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.brand
   */
  export type Product$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    where?: BrandWhereInput
  }

  /**
   * Product.category
   */
  export type Product$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    cursor?: VariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product.suppliers
   */
  export type Product$suppliersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    where?: ProductSupplierWhereInput
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    cursor?: ProductSupplierWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductSupplierScalarFieldEnum | ProductSupplierScalarFieldEnum[]
  }

  /**
   * Product.attributes
   */
  export type Product$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    cursor?: ProductAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductAttribute
   */

  export type AggregateProductAttribute = {
    _count: ProductAttributeCountAggregateOutputType | null
    _avg: ProductAttributeAvgAggregateOutputType | null
    _sum: ProductAttributeSumAggregateOutputType | null
    _min: ProductAttributeMinAggregateOutputType | null
    _max: ProductAttributeMaxAggregateOutputType | null
  }

  export type ProductAttributeAvgAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductAttributeSumAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductAttributeMinAggregateOutputType = {
    id: number | null
    productId: number | null
    name: string | null
    value: string | null
  }

  export type ProductAttributeMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    name: string | null
    value: string | null
  }

  export type ProductAttributeCountAggregateOutputType = {
    id: number
    productId: number
    name: number
    value: number
    _all: number
  }


  export type ProductAttributeAvgAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductAttributeSumAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductAttributeMinAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    value?: true
  }

  export type ProductAttributeMaxAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    value?: true
  }

  export type ProductAttributeCountAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    value?: true
    _all?: true
  }

  export type ProductAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttribute to aggregate.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductAttributes
    **/
    _count?: true | ProductAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductAttributeMaxAggregateInputType
  }

  export type GetProductAttributeAggregateType<T extends ProductAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateProductAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductAttribute[P]>
      : GetScalarType<T[P], AggregateProductAttribute[P]>
  }




  export type ProductAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithAggregationInput | ProductAttributeOrderByWithAggregationInput[]
    by: ProductAttributeScalarFieldEnum[] | ProductAttributeScalarFieldEnum
    having?: ProductAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductAttributeCountAggregateInputType | true
    _avg?: ProductAttributeAvgAggregateInputType
    _sum?: ProductAttributeSumAggregateInputType
    _min?: ProductAttributeMinAggregateInputType
    _max?: ProductAttributeMaxAggregateInputType
  }

  export type ProductAttributeGroupByOutputType = {
    id: number
    productId: number
    name: string
    value: string
    _count: ProductAttributeCountAggregateOutputType | null
    _avg: ProductAttributeAvgAggregateOutputType | null
    _sum: ProductAttributeSumAggregateOutputType | null
    _min: ProductAttributeMinAggregateOutputType | null
    _max: ProductAttributeMaxAggregateOutputType | null
  }

  type GetProductAttributeGroupByPayload<T extends ProductAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], ProductAttributeGroupByOutputType[P]>
        }
      >
    >


  export type ProductAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    name?: boolean
    value?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttribute"]>


  export type ProductAttributeSelectScalar = {
    id?: boolean
    productId?: boolean
    name?: boolean
    value?: boolean
  }

  export type ProductAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductAttribute"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      name: string
      value: string
    }, ExtArgs["result"]["productAttribute"]>
    composites: {}
  }

  type ProductAttributeGetPayload<S extends boolean | null | undefined | ProductAttributeDefaultArgs> = $Result.GetResult<Prisma.$ProductAttributePayload, S>

  type ProductAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductAttributeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductAttributeCountAggregateInputType | true
    }

  export interface ProductAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductAttribute'], meta: { name: 'ProductAttribute' } }
    /**
     * Find zero or one ProductAttribute that matches the filter.
     * @param {ProductAttributeFindUniqueArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductAttributeFindUniqueArgs>(args: SelectSubset<T, ProductAttributeFindUniqueArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductAttribute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductAttributeFindUniqueOrThrowArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindFirstArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductAttributeFindFirstArgs>(args?: SelectSubset<T, ProductAttributeFindFirstArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindFirstOrThrowArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductAttributes
     * const productAttributes = await prisma.productAttribute.findMany()
     * 
     * // Get first 10 ProductAttributes
     * const productAttributes = await prisma.productAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productAttributeWithIdOnly = await prisma.productAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductAttributeFindManyArgs>(args?: SelectSubset<T, ProductAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductAttribute.
     * @param {ProductAttributeCreateArgs} args - Arguments to create a ProductAttribute.
     * @example
     * // Create one ProductAttribute
     * const ProductAttribute = await prisma.productAttribute.create({
     *   data: {
     *     // ... data to create a ProductAttribute
     *   }
     * })
     * 
     */
    create<T extends ProductAttributeCreateArgs>(args: SelectSubset<T, ProductAttributeCreateArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductAttributes.
     * @param {ProductAttributeCreateManyArgs} args - Arguments to create many ProductAttributes.
     * @example
     * // Create many ProductAttributes
     * const productAttribute = await prisma.productAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductAttributeCreateManyArgs>(args?: SelectSubset<T, ProductAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductAttribute.
     * @param {ProductAttributeDeleteArgs} args - Arguments to delete one ProductAttribute.
     * @example
     * // Delete one ProductAttribute
     * const ProductAttribute = await prisma.productAttribute.delete({
     *   where: {
     *     // ... filter to delete one ProductAttribute
     *   }
     * })
     * 
     */
    delete<T extends ProductAttributeDeleteArgs>(args: SelectSubset<T, ProductAttributeDeleteArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductAttribute.
     * @param {ProductAttributeUpdateArgs} args - Arguments to update one ProductAttribute.
     * @example
     * // Update one ProductAttribute
     * const productAttribute = await prisma.productAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductAttributeUpdateArgs>(args: SelectSubset<T, ProductAttributeUpdateArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductAttributes.
     * @param {ProductAttributeDeleteManyArgs} args - Arguments to filter ProductAttributes to delete.
     * @example
     * // Delete a few ProductAttributes
     * const { count } = await prisma.productAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductAttributeDeleteManyArgs>(args?: SelectSubset<T, ProductAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductAttributes
     * const productAttribute = await prisma.productAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductAttributeUpdateManyArgs>(args: SelectSubset<T, ProductAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductAttribute.
     * @param {ProductAttributeUpsertArgs} args - Arguments to update or create a ProductAttribute.
     * @example
     * // Update or create a ProductAttribute
     * const productAttribute = await prisma.productAttribute.upsert({
     *   create: {
     *     // ... data to create a ProductAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductAttribute we want to update
     *   }
     * })
     */
    upsert<T extends ProductAttributeUpsertArgs>(args: SelectSubset<T, ProductAttributeUpsertArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeCountArgs} args - Arguments to filter ProductAttributes to count.
     * @example
     * // Count the number of ProductAttributes
     * const count = await prisma.productAttribute.count({
     *   where: {
     *     // ... the filter for the ProductAttributes we want to count
     *   }
     * })
    **/
    count<T extends ProductAttributeCountArgs>(
      args?: Subset<T, ProductAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAttributeAggregateArgs>(args: Subset<T, ProductAttributeAggregateArgs>): Prisma.PrismaPromise<GetProductAttributeAggregateType<T>>

    /**
     * Group by ProductAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeGroupByArgs} args - Group by arguments.
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
      T extends ProductAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductAttributeGroupByArgs['orderBy'] }
        : { orderBy?: ProductAttributeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductAttribute model
   */
  readonly fields: ProductAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductAttribute model
   */ 
  interface ProductAttributeFieldRefs {
    readonly id: FieldRef<"ProductAttribute", 'Int'>
    readonly productId: FieldRef<"ProductAttribute", 'Int'>
    readonly name: FieldRef<"ProductAttribute", 'String'>
    readonly value: FieldRef<"ProductAttribute", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductAttribute findUnique
   */
  export type ProductAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute findUniqueOrThrow
   */
  export type ProductAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute findFirst
   */
  export type ProductAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributes.
     */
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute findFirstOrThrow
   */
  export type ProductAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributes.
     */
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute findMany
   */
  export type ProductAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributes to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute create
   */
  export type ProductAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductAttribute.
     */
    data: XOR<ProductAttributeCreateInput, ProductAttributeUncheckedCreateInput>
  }

  /**
   * ProductAttribute createMany
   */
  export type ProductAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductAttributes.
     */
    data: ProductAttributeCreateManyInput | ProductAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductAttribute update
   */
  export type ProductAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductAttribute.
     */
    data: XOR<ProductAttributeUpdateInput, ProductAttributeUncheckedUpdateInput>
    /**
     * Choose, which ProductAttribute to update.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute updateMany
   */
  export type ProductAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductAttributes.
     */
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyInput>
    /**
     * Filter which ProductAttributes to update
     */
    where?: ProductAttributeWhereInput
  }

  /**
   * ProductAttribute upsert
   */
  export type ProductAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductAttribute to update in case it exists.
     */
    where: ProductAttributeWhereUniqueInput
    /**
     * In case the ProductAttribute found by the `where` argument doesn't exist, create a new ProductAttribute with this data.
     */
    create: XOR<ProductAttributeCreateInput, ProductAttributeUncheckedCreateInput>
    /**
     * In case the ProductAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductAttributeUpdateInput, ProductAttributeUncheckedUpdateInput>
  }

  /**
   * ProductAttribute delete
   */
  export type ProductAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter which ProductAttribute to delete.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute deleteMany
   */
  export type ProductAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributes to delete
     */
    where?: ProductAttributeWhereInput
  }

  /**
   * ProductAttribute without action
   */
  export type ProductAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
  }


  /**
   * Model Variant
   */

  export type AggregateVariant = {
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  export type VariantAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    costPrice: Decimal | null
    sellingPrice: Decimal | null
    weight: Decimal | null
  }

  export type VariantSumAggregateOutputType = {
    id: number | null
    productId: number | null
    costPrice: Decimal | null
    sellingPrice: Decimal | null
    weight: Decimal | null
  }

  export type VariantMinAggregateOutputType = {
    id: number | null
    productId: number | null
    sku: string | null
    name: string | null
    costPrice: Decimal | null
    sellingPrice: Decimal | null
    weight: Decimal | null
    dimensions: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VariantMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    sku: string | null
    name: string | null
    costPrice: Decimal | null
    sellingPrice: Decimal | null
    weight: Decimal | null
    dimensions: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VariantCountAggregateOutputType = {
    id: number
    productId: number
    sku: number
    name: number
    costPrice: number
    sellingPrice: number
    weight: number
    dimensions: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VariantAvgAggregateInputType = {
    id?: true
    productId?: true
    costPrice?: true
    sellingPrice?: true
    weight?: true
  }

  export type VariantSumAggregateInputType = {
    id?: true
    productId?: true
    costPrice?: true
    sellingPrice?: true
    weight?: true
  }

  export type VariantMinAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    name?: true
    costPrice?: true
    sellingPrice?: true
    weight?: true
    dimensions?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VariantMaxAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    name?: true
    costPrice?: true
    sellingPrice?: true
    weight?: true
    dimensions?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VariantCountAggregateInputType = {
    id?: true
    productId?: true
    sku?: true
    name?: true
    costPrice?: true
    sellingPrice?: true
    weight?: true
    dimensions?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variant to aggregate.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Variants
    **/
    _count?: true | VariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VariantMaxAggregateInputType
  }

  export type GetVariantAggregateType<T extends VariantAggregateArgs> = {
        [P in keyof T & keyof AggregateVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVariant[P]>
      : GetScalarType<T[P], AggregateVariant[P]>
  }




  export type VariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithAggregationInput | VariantOrderByWithAggregationInput[]
    by: VariantScalarFieldEnum[] | VariantScalarFieldEnum
    having?: VariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VariantCountAggregateInputType | true
    _avg?: VariantAvgAggregateInputType
    _sum?: VariantSumAggregateInputType
    _min?: VariantMinAggregateInputType
    _max?: VariantMaxAggregateInputType
  }

  export type VariantGroupByOutputType = {
    id: number
    productId: number
    sku: string
    name: string | null
    costPrice: Decimal
    sellingPrice: Decimal
    weight: Decimal | null
    dimensions: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  type GetVariantGroupByPayload<T extends VariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VariantGroupByOutputType[P]>
            : GetScalarType<T[P], VariantGroupByOutputType[P]>
        }
      >
    >


  export type VariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    costPrice?: boolean
    sellingPrice?: boolean
    weight?: boolean
    dimensions?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attributes?: boolean | Variant$attributesArgs<ExtArgs>
    _count?: boolean | VariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["variant"]>


  export type VariantSelectScalar = {
    id?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    costPrice?: boolean
    sellingPrice?: boolean
    weight?: boolean
    dimensions?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attributes?: boolean | Variant$attributesArgs<ExtArgs>
    _count?: boolean | VariantCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Variant"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      attributes: Prisma.$VariantAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      sku: string
      name: string | null
      costPrice: Prisma.Decimal
      sellingPrice: Prisma.Decimal
      weight: Prisma.Decimal | null
      dimensions: string | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["variant"]>
    composites: {}
  }

  type VariantGetPayload<S extends boolean | null | undefined | VariantDefaultArgs> = $Result.GetResult<Prisma.$VariantPayload, S>

  type VariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VariantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VariantCountAggregateInputType | true
    }

  export interface VariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Variant'], meta: { name: 'Variant' } }
    /**
     * Find zero or one Variant that matches the filter.
     * @param {VariantFindUniqueArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VariantFindUniqueArgs>(args: SelectSubset<T, VariantFindUniqueArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Variant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VariantFindUniqueOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VariantFindUniqueOrThrowArgs>(args: SelectSubset<T, VariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Variant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VariantFindFirstArgs>(args?: SelectSubset<T, VariantFindFirstArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Variant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VariantFindFirstOrThrowArgs>(args?: SelectSubset<T, VariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Variants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Variants
     * const variants = await prisma.variant.findMany()
     * 
     * // Get first 10 Variants
     * const variants = await prisma.variant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const variantWithIdOnly = await prisma.variant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VariantFindManyArgs>(args?: SelectSubset<T, VariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Variant.
     * @param {VariantCreateArgs} args - Arguments to create a Variant.
     * @example
     * // Create one Variant
     * const Variant = await prisma.variant.create({
     *   data: {
     *     // ... data to create a Variant
     *   }
     * })
     * 
     */
    create<T extends VariantCreateArgs>(args: SelectSubset<T, VariantCreateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Variants.
     * @param {VariantCreateManyArgs} args - Arguments to create many Variants.
     * @example
     * // Create many Variants
     * const variant = await prisma.variant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VariantCreateManyArgs>(args?: SelectSubset<T, VariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Variant.
     * @param {VariantDeleteArgs} args - Arguments to delete one Variant.
     * @example
     * // Delete one Variant
     * const Variant = await prisma.variant.delete({
     *   where: {
     *     // ... filter to delete one Variant
     *   }
     * })
     * 
     */
    delete<T extends VariantDeleteArgs>(args: SelectSubset<T, VariantDeleteArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Variant.
     * @param {VariantUpdateArgs} args - Arguments to update one Variant.
     * @example
     * // Update one Variant
     * const variant = await prisma.variant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VariantUpdateArgs>(args: SelectSubset<T, VariantUpdateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Variants.
     * @param {VariantDeleteManyArgs} args - Arguments to filter Variants to delete.
     * @example
     * // Delete a few Variants
     * const { count } = await prisma.variant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VariantDeleteManyArgs>(args?: SelectSubset<T, VariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Variants
     * const variant = await prisma.variant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VariantUpdateManyArgs>(args: SelectSubset<T, VariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Variant.
     * @param {VariantUpsertArgs} args - Arguments to update or create a Variant.
     * @example
     * // Update or create a Variant
     * const variant = await prisma.variant.upsert({
     *   create: {
     *     // ... data to create a Variant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Variant we want to update
     *   }
     * })
     */
    upsert<T extends VariantUpsertArgs>(args: SelectSubset<T, VariantUpsertArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantCountArgs} args - Arguments to filter Variants to count.
     * @example
     * // Count the number of Variants
     * const count = await prisma.variant.count({
     *   where: {
     *     // ... the filter for the Variants we want to count
     *   }
     * })
    **/
    count<T extends VariantCountArgs>(
      args?: Subset<T, VariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VariantAggregateArgs>(args: Subset<T, VariantAggregateArgs>): Prisma.PrismaPromise<GetVariantAggregateType<T>>

    /**
     * Group by Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantGroupByArgs} args - Group by arguments.
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
      T extends VariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VariantGroupByArgs['orderBy'] }
        : { orderBy?: VariantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Variant model
   */
  readonly fields: VariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Variant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    attributes<T extends Variant$attributesArgs<ExtArgs> = {}>(args?: Subset<T, Variant$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Variant model
   */ 
  interface VariantFieldRefs {
    readonly id: FieldRef<"Variant", 'Int'>
    readonly productId: FieldRef<"Variant", 'Int'>
    readonly sku: FieldRef<"Variant", 'String'>
    readonly name: FieldRef<"Variant", 'String'>
    readonly costPrice: FieldRef<"Variant", 'Decimal'>
    readonly sellingPrice: FieldRef<"Variant", 'Decimal'>
    readonly weight: FieldRef<"Variant", 'Decimal'>
    readonly dimensions: FieldRef<"Variant", 'String'>
    readonly image: FieldRef<"Variant", 'String'>
    readonly createdAt: FieldRef<"Variant", 'DateTime'>
    readonly updatedAt: FieldRef<"Variant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Variant findUnique
   */
  export type VariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findUniqueOrThrow
   */
  export type VariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findFirst
   */
  export type VariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findFirstOrThrow
   */
  export type VariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findMany
   */
  export type VariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variants to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant create
   */
  export type VariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to create a Variant.
     */
    data: XOR<VariantCreateInput, VariantUncheckedCreateInput>
  }

  /**
   * Variant createMany
   */
  export type VariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Variants.
     */
    data: VariantCreateManyInput | VariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Variant update
   */
  export type VariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to update a Variant.
     */
    data: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
    /**
     * Choose, which Variant to update.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant updateMany
   */
  export type VariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Variants.
     */
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyInput>
    /**
     * Filter which Variants to update
     */
    where?: VariantWhereInput
  }

  /**
   * Variant upsert
   */
  export type VariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The filter to search for the Variant to update in case it exists.
     */
    where: VariantWhereUniqueInput
    /**
     * In case the Variant found by the `where` argument doesn't exist, create a new Variant with this data.
     */
    create: XOR<VariantCreateInput, VariantUncheckedCreateInput>
    /**
     * In case the Variant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
  }

  /**
   * Variant delete
   */
  export type VariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter which Variant to delete.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant deleteMany
   */
  export type VariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variants to delete
     */
    where?: VariantWhereInput
  }

  /**
   * Variant.attributes
   */
  export type Variant$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    where?: VariantAttributeWhereInput
    orderBy?: VariantAttributeOrderByWithRelationInput | VariantAttributeOrderByWithRelationInput[]
    cursor?: VariantAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VariantAttributeScalarFieldEnum | VariantAttributeScalarFieldEnum[]
  }

  /**
   * Variant without action
   */
  export type VariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    parentId: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
    companyId: number | null
    parentId: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    parentId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    parentId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    parentId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
    companyId?: true
    parentId?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
    companyId?: true
    parentId?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    parentId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    parentId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    parentId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    companyId: number
    name: string
    parentId: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    parentId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>


  export type CategorySelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    parentId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      parentId: number | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly companyId: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'Int'>
    readonly status: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type BrandSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type BrandMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    description: string | null
    logo: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    description: string | null
    logo: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    description: number
    logo: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrandAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type BrandSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type BrandMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    description?: true
    logo?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    description?: true
    logo?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    description?: true
    logo?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brand to aggregate.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithAggregationInput | BrandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _avg?: BrandAvgAggregateInputType
    _sum?: BrandSumAggregateInputType
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: number
    companyId: number
    name: string
    description: string | null
    logo: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Brand$productsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>


  export type BrandSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Brand$productsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      description: string | null
      logo: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = $Result.GetResult<Prisma.$BrandPayload, S>

  type BrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface BrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brand'], meta: { name: 'Brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandFindUniqueArgs>(args: SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandFindFirstArgs>(args?: SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandFindManyArgs>(args?: SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends BrandCreateArgs>(args: SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Brands.
     * @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandCreateManyArgs>(args?: SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends BrandDeleteArgs>(args: SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandUpdateArgs>(args: SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandDeleteManyArgs>(args?: SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandUpdateManyArgs>(args: SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends BrandUpsertArgs>(args: SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
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
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brand model
   */
  readonly fields: BrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Brand$productsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Brand model
   */ 
  interface BrandFieldRefs {
    readonly id: FieldRef<"Brand", 'Int'>
    readonly companyId: FieldRef<"Brand", 'Int'>
    readonly name: FieldRef<"Brand", 'String'>
    readonly description: FieldRef<"Brand", 'String'>
    readonly logo: FieldRef<"Brand", 'String'>
    readonly isActive: FieldRef<"Brand", 'Boolean'>
    readonly createdAt: FieldRef<"Brand", 'DateTime'>
    readonly updatedAt: FieldRef<"Brand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Brand findUnique
   */
  export type BrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findFirst
   */
  export type BrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brands to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand create
   */
  export type BrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to create a Brand.
     */
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }

  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand update
   */
  export type BrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to update a Brand.
     */
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
  }

  /**
   * Brand upsert
   */
  export type BrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The filter to search for the Brand to update in case it exists.
     */
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     */
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }

  /**
   * Brand delete
   */
  export type BrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter which Brand to delete.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brands to delete
     */
    where?: BrandWhereInput
  }

  /**
   * Brand.products
   */
  export type Brand$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Brand without action
   */
  export type BrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
  }


  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    order: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    id: number | null
    productId: number | null
    order: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    id: number | null
    productId: number | null
    url: string | null
    isMain: boolean | null
    order: number | null
  }

  export type ProductImageMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    url: string | null
    isMain: boolean | null
    order: number | null
  }

  export type ProductImageCountAggregateOutputType = {
    id: number
    productId: number
    url: number
    isMain: number
    order: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    id?: true
    productId?: true
    order?: true
  }

  export type ProductImageSumAggregateInputType = {
    id?: true
    productId?: true
    order?: true
  }

  export type ProductImageMinAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    isMain?: true
    order?: true
  }

  export type ProductImageMaxAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    isMain?: true
    order?: true
  }

  export type ProductImageCountAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    isMain?: true
    order?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    id: number
    productId: number
    url: string
    isMain: boolean
    order: number
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    url?: boolean
    isMain?: boolean
    order?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>


  export type ProductImageSelectScalar = {
    id?: boolean
    productId?: boolean
    url?: boolean
    isMain?: boolean
    order?: boolean
  }

  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      url: string
      isMain: boolean
      order: number
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
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
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductImage model
   */ 
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", 'Int'>
    readonly productId: FieldRef<"ProductImage", 'Int'>
    readonly url: FieldRef<"ProductImage", 'String'>
    readonly isMain: FieldRef<"ProductImage", 'Boolean'>
    readonly order: FieldRef<"ProductImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model VariantAttribute
   */

  export type AggregateVariantAttribute = {
    _count: VariantAttributeCountAggregateOutputType | null
    _avg: VariantAttributeAvgAggregateOutputType | null
    _sum: VariantAttributeSumAggregateOutputType | null
    _min: VariantAttributeMinAggregateOutputType | null
    _max: VariantAttributeMaxAggregateOutputType | null
  }

  export type VariantAttributeAvgAggregateOutputType = {
    id: number | null
    variantId: number | null
  }

  export type VariantAttributeSumAggregateOutputType = {
    id: number | null
    variantId: number | null
  }

  export type VariantAttributeMinAggregateOutputType = {
    id: number | null
    variantId: number | null
    name: string | null
    value: string | null
  }

  export type VariantAttributeMaxAggregateOutputType = {
    id: number | null
    variantId: number | null
    name: string | null
    value: string | null
  }

  export type VariantAttributeCountAggregateOutputType = {
    id: number
    variantId: number
    name: number
    value: number
    _all: number
  }


  export type VariantAttributeAvgAggregateInputType = {
    id?: true
    variantId?: true
  }

  export type VariantAttributeSumAggregateInputType = {
    id?: true
    variantId?: true
  }

  export type VariantAttributeMinAggregateInputType = {
    id?: true
    variantId?: true
    name?: true
    value?: true
  }

  export type VariantAttributeMaxAggregateInputType = {
    id?: true
    variantId?: true
    name?: true
    value?: true
  }

  export type VariantAttributeCountAggregateInputType = {
    id?: true
    variantId?: true
    name?: true
    value?: true
    _all?: true
  }

  export type VariantAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VariantAttribute to aggregate.
     */
    where?: VariantAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VariantAttributes to fetch.
     */
    orderBy?: VariantAttributeOrderByWithRelationInput | VariantAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VariantAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VariantAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VariantAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VariantAttributes
    **/
    _count?: true | VariantAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VariantAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VariantAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VariantAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VariantAttributeMaxAggregateInputType
  }

  export type GetVariantAttributeAggregateType<T extends VariantAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateVariantAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVariantAttribute[P]>
      : GetScalarType<T[P], AggregateVariantAttribute[P]>
  }




  export type VariantAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantAttributeWhereInput
    orderBy?: VariantAttributeOrderByWithAggregationInput | VariantAttributeOrderByWithAggregationInput[]
    by: VariantAttributeScalarFieldEnum[] | VariantAttributeScalarFieldEnum
    having?: VariantAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VariantAttributeCountAggregateInputType | true
    _avg?: VariantAttributeAvgAggregateInputType
    _sum?: VariantAttributeSumAggregateInputType
    _min?: VariantAttributeMinAggregateInputType
    _max?: VariantAttributeMaxAggregateInputType
  }

  export type VariantAttributeGroupByOutputType = {
    id: number
    variantId: number
    name: string
    value: string
    _count: VariantAttributeCountAggregateOutputType | null
    _avg: VariantAttributeAvgAggregateOutputType | null
    _sum: VariantAttributeSumAggregateOutputType | null
    _min: VariantAttributeMinAggregateOutputType | null
    _max: VariantAttributeMaxAggregateOutputType | null
  }

  type GetVariantAttributeGroupByPayload<T extends VariantAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VariantAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VariantAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VariantAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], VariantAttributeGroupByOutputType[P]>
        }
      >
    >


  export type VariantAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variantId?: boolean
    name?: boolean
    value?: boolean
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["variantAttribute"]>


  export type VariantAttributeSelectScalar = {
    id?: boolean
    variantId?: boolean
    name?: boolean
    value?: boolean
  }

  export type VariantAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }

  export type $VariantAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VariantAttribute"
    objects: {
      variant: Prisma.$VariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      variantId: number
      name: string
      value: string
    }, ExtArgs["result"]["variantAttribute"]>
    composites: {}
  }

  type VariantAttributeGetPayload<S extends boolean | null | undefined | VariantAttributeDefaultArgs> = $Result.GetResult<Prisma.$VariantAttributePayload, S>

  type VariantAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VariantAttributeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VariantAttributeCountAggregateInputType | true
    }

  export interface VariantAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VariantAttribute'], meta: { name: 'VariantAttribute' } }
    /**
     * Find zero or one VariantAttribute that matches the filter.
     * @param {VariantAttributeFindUniqueArgs} args - Arguments to find a VariantAttribute
     * @example
     * // Get one VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VariantAttributeFindUniqueArgs>(args: SelectSubset<T, VariantAttributeFindUniqueArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VariantAttribute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VariantAttributeFindUniqueOrThrowArgs} args - Arguments to find a VariantAttribute
     * @example
     * // Get one VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VariantAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, VariantAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VariantAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeFindFirstArgs} args - Arguments to find a VariantAttribute
     * @example
     * // Get one VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VariantAttributeFindFirstArgs>(args?: SelectSubset<T, VariantAttributeFindFirstArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VariantAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeFindFirstOrThrowArgs} args - Arguments to find a VariantAttribute
     * @example
     * // Get one VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VariantAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, VariantAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VariantAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VariantAttributes
     * const variantAttributes = await prisma.variantAttribute.findMany()
     * 
     * // Get first 10 VariantAttributes
     * const variantAttributes = await prisma.variantAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const variantAttributeWithIdOnly = await prisma.variantAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VariantAttributeFindManyArgs>(args?: SelectSubset<T, VariantAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VariantAttribute.
     * @param {VariantAttributeCreateArgs} args - Arguments to create a VariantAttribute.
     * @example
     * // Create one VariantAttribute
     * const VariantAttribute = await prisma.variantAttribute.create({
     *   data: {
     *     // ... data to create a VariantAttribute
     *   }
     * })
     * 
     */
    create<T extends VariantAttributeCreateArgs>(args: SelectSubset<T, VariantAttributeCreateArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VariantAttributes.
     * @param {VariantAttributeCreateManyArgs} args - Arguments to create many VariantAttributes.
     * @example
     * // Create many VariantAttributes
     * const variantAttribute = await prisma.variantAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VariantAttributeCreateManyArgs>(args?: SelectSubset<T, VariantAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VariantAttribute.
     * @param {VariantAttributeDeleteArgs} args - Arguments to delete one VariantAttribute.
     * @example
     * // Delete one VariantAttribute
     * const VariantAttribute = await prisma.variantAttribute.delete({
     *   where: {
     *     // ... filter to delete one VariantAttribute
     *   }
     * })
     * 
     */
    delete<T extends VariantAttributeDeleteArgs>(args: SelectSubset<T, VariantAttributeDeleteArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VariantAttribute.
     * @param {VariantAttributeUpdateArgs} args - Arguments to update one VariantAttribute.
     * @example
     * // Update one VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VariantAttributeUpdateArgs>(args: SelectSubset<T, VariantAttributeUpdateArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VariantAttributes.
     * @param {VariantAttributeDeleteManyArgs} args - Arguments to filter VariantAttributes to delete.
     * @example
     * // Delete a few VariantAttributes
     * const { count } = await prisma.variantAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VariantAttributeDeleteManyArgs>(args?: SelectSubset<T, VariantAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VariantAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VariantAttributes
     * const variantAttribute = await prisma.variantAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VariantAttributeUpdateManyArgs>(args: SelectSubset<T, VariantAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VariantAttribute.
     * @param {VariantAttributeUpsertArgs} args - Arguments to update or create a VariantAttribute.
     * @example
     * // Update or create a VariantAttribute
     * const variantAttribute = await prisma.variantAttribute.upsert({
     *   create: {
     *     // ... data to create a VariantAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VariantAttribute we want to update
     *   }
     * })
     */
    upsert<T extends VariantAttributeUpsertArgs>(args: SelectSubset<T, VariantAttributeUpsertArgs<ExtArgs>>): Prisma__VariantAttributeClient<$Result.GetResult<Prisma.$VariantAttributePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VariantAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeCountArgs} args - Arguments to filter VariantAttributes to count.
     * @example
     * // Count the number of VariantAttributes
     * const count = await prisma.variantAttribute.count({
     *   where: {
     *     // ... the filter for the VariantAttributes we want to count
     *   }
     * })
    **/
    count<T extends VariantAttributeCountArgs>(
      args?: Subset<T, VariantAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VariantAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VariantAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VariantAttributeAggregateArgs>(args: Subset<T, VariantAttributeAggregateArgs>): Prisma.PrismaPromise<GetVariantAttributeAggregateType<T>>

    /**
     * Group by VariantAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAttributeGroupByArgs} args - Group by arguments.
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
      T extends VariantAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VariantAttributeGroupByArgs['orderBy'] }
        : { orderBy?: VariantAttributeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VariantAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVariantAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VariantAttribute model
   */
  readonly fields: VariantAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VariantAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VariantAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variant<T extends VariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VariantDefaultArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the VariantAttribute model
   */ 
  interface VariantAttributeFieldRefs {
    readonly id: FieldRef<"VariantAttribute", 'Int'>
    readonly variantId: FieldRef<"VariantAttribute", 'Int'>
    readonly name: FieldRef<"VariantAttribute", 'String'>
    readonly value: FieldRef<"VariantAttribute", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VariantAttribute findUnique
   */
  export type VariantAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter, which VariantAttribute to fetch.
     */
    where: VariantAttributeWhereUniqueInput
  }

  /**
   * VariantAttribute findUniqueOrThrow
   */
  export type VariantAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter, which VariantAttribute to fetch.
     */
    where: VariantAttributeWhereUniqueInput
  }

  /**
   * VariantAttribute findFirst
   */
  export type VariantAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter, which VariantAttribute to fetch.
     */
    where?: VariantAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VariantAttributes to fetch.
     */
    orderBy?: VariantAttributeOrderByWithRelationInput | VariantAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VariantAttributes.
     */
    cursor?: VariantAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VariantAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VariantAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VariantAttributes.
     */
    distinct?: VariantAttributeScalarFieldEnum | VariantAttributeScalarFieldEnum[]
  }

  /**
   * VariantAttribute findFirstOrThrow
   */
  export type VariantAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter, which VariantAttribute to fetch.
     */
    where?: VariantAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VariantAttributes to fetch.
     */
    orderBy?: VariantAttributeOrderByWithRelationInput | VariantAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VariantAttributes.
     */
    cursor?: VariantAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VariantAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VariantAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VariantAttributes.
     */
    distinct?: VariantAttributeScalarFieldEnum | VariantAttributeScalarFieldEnum[]
  }

  /**
   * VariantAttribute findMany
   */
  export type VariantAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter, which VariantAttributes to fetch.
     */
    where?: VariantAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VariantAttributes to fetch.
     */
    orderBy?: VariantAttributeOrderByWithRelationInput | VariantAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VariantAttributes.
     */
    cursor?: VariantAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VariantAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VariantAttributes.
     */
    skip?: number
    distinct?: VariantAttributeScalarFieldEnum | VariantAttributeScalarFieldEnum[]
  }

  /**
   * VariantAttribute create
   */
  export type VariantAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a VariantAttribute.
     */
    data: XOR<VariantAttributeCreateInput, VariantAttributeUncheckedCreateInput>
  }

  /**
   * VariantAttribute createMany
   */
  export type VariantAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VariantAttributes.
     */
    data: VariantAttributeCreateManyInput | VariantAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VariantAttribute update
   */
  export type VariantAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a VariantAttribute.
     */
    data: XOR<VariantAttributeUpdateInput, VariantAttributeUncheckedUpdateInput>
    /**
     * Choose, which VariantAttribute to update.
     */
    where: VariantAttributeWhereUniqueInput
  }

  /**
   * VariantAttribute updateMany
   */
  export type VariantAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VariantAttributes.
     */
    data: XOR<VariantAttributeUpdateManyMutationInput, VariantAttributeUncheckedUpdateManyInput>
    /**
     * Filter which VariantAttributes to update
     */
    where?: VariantAttributeWhereInput
  }

  /**
   * VariantAttribute upsert
   */
  export type VariantAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the VariantAttribute to update in case it exists.
     */
    where: VariantAttributeWhereUniqueInput
    /**
     * In case the VariantAttribute found by the `where` argument doesn't exist, create a new VariantAttribute with this data.
     */
    create: XOR<VariantAttributeCreateInput, VariantAttributeUncheckedCreateInput>
    /**
     * In case the VariantAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VariantAttributeUpdateInput, VariantAttributeUncheckedUpdateInput>
  }

  /**
   * VariantAttribute delete
   */
  export type VariantAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
    /**
     * Filter which VariantAttribute to delete.
     */
    where: VariantAttributeWhereUniqueInput
  }

  /**
   * VariantAttribute deleteMany
   */
  export type VariantAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VariantAttributes to delete
     */
    where?: VariantAttributeWhereInput
  }

  /**
   * VariantAttribute without action
   */
  export type VariantAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantAttribute
     */
    select?: VariantAttributeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantAttributeInclude<ExtArgs> | null
  }


  /**
   * Model GlobalAttribute
   */

  export type AggregateGlobalAttribute = {
    _count: GlobalAttributeCountAggregateOutputType | null
    _avg: GlobalAttributeAvgAggregateOutputType | null
    _sum: GlobalAttributeSumAggregateOutputType | null
    _min: GlobalAttributeMinAggregateOutputType | null
    _max: GlobalAttributeMaxAggregateOutputType | null
  }

  export type GlobalAttributeAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type GlobalAttributeSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type GlobalAttributeMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GlobalAttributeMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GlobalAttributeCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    type: number
    options: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GlobalAttributeAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type GlobalAttributeSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type GlobalAttributeMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GlobalAttributeMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GlobalAttributeCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    type?: true
    options?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GlobalAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalAttribute to aggregate.
     */
    where?: GlobalAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAttributes to fetch.
     */
    orderBy?: GlobalAttributeOrderByWithRelationInput | GlobalAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalAttributes
    **/
    _count?: true | GlobalAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GlobalAttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GlobalAttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalAttributeMaxAggregateInputType
  }

  export type GetGlobalAttributeAggregateType<T extends GlobalAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalAttribute[P]>
      : GetScalarType<T[P], AggregateGlobalAttribute[P]>
  }




  export type GlobalAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalAttributeWhereInput
    orderBy?: GlobalAttributeOrderByWithAggregationInput | GlobalAttributeOrderByWithAggregationInput[]
    by: GlobalAttributeScalarFieldEnum[] | GlobalAttributeScalarFieldEnum
    having?: GlobalAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalAttributeCountAggregateInputType | true
    _avg?: GlobalAttributeAvgAggregateInputType
    _sum?: GlobalAttributeSumAggregateInputType
    _min?: GlobalAttributeMinAggregateInputType
    _max?: GlobalAttributeMaxAggregateInputType
  }

  export type GlobalAttributeGroupByOutputType = {
    id: number
    companyId: number
    name: string
    type: string
    options: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: GlobalAttributeCountAggregateOutputType | null
    _avg: GlobalAttributeAvgAggregateOutputType | null
    _sum: GlobalAttributeSumAggregateOutputType | null
    _min: GlobalAttributeMinAggregateOutputType | null
    _max: GlobalAttributeMaxAggregateOutputType | null
  }

  type GetGlobalAttributeGroupByPayload<T extends GlobalAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalAttributeGroupByOutputType[P]>
        }
      >
    >


  export type GlobalAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    type?: boolean
    options?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalAttribute"]>


  export type GlobalAttributeSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    type?: boolean
    options?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $GlobalAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalAttribute"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      type: string
      options: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["globalAttribute"]>
    composites: {}
  }

  type GlobalAttributeGetPayload<S extends boolean | null | undefined | GlobalAttributeDefaultArgs> = $Result.GetResult<Prisma.$GlobalAttributePayload, S>

  type GlobalAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GlobalAttributeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GlobalAttributeCountAggregateInputType | true
    }

  export interface GlobalAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalAttribute'], meta: { name: 'GlobalAttribute' } }
    /**
     * Find zero or one GlobalAttribute that matches the filter.
     * @param {GlobalAttributeFindUniqueArgs} args - Arguments to find a GlobalAttribute
     * @example
     * // Get one GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalAttributeFindUniqueArgs>(args: SelectSubset<T, GlobalAttributeFindUniqueArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GlobalAttribute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GlobalAttributeFindUniqueOrThrowArgs} args - Arguments to find a GlobalAttribute
     * @example
     * // Get one GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GlobalAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeFindFirstArgs} args - Arguments to find a GlobalAttribute
     * @example
     * // Get one GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalAttributeFindFirstArgs>(args?: SelectSubset<T, GlobalAttributeFindFirstArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GlobalAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeFindFirstOrThrowArgs} args - Arguments to find a GlobalAttribute
     * @example
     * // Get one GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GlobalAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalAttributes
     * const globalAttributes = await prisma.globalAttribute.findMany()
     * 
     * // Get first 10 GlobalAttributes
     * const globalAttributes = await prisma.globalAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalAttributeWithIdOnly = await prisma.globalAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalAttributeFindManyArgs>(args?: SelectSubset<T, GlobalAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GlobalAttribute.
     * @param {GlobalAttributeCreateArgs} args - Arguments to create a GlobalAttribute.
     * @example
     * // Create one GlobalAttribute
     * const GlobalAttribute = await prisma.globalAttribute.create({
     *   data: {
     *     // ... data to create a GlobalAttribute
     *   }
     * })
     * 
     */
    create<T extends GlobalAttributeCreateArgs>(args: SelectSubset<T, GlobalAttributeCreateArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GlobalAttributes.
     * @param {GlobalAttributeCreateManyArgs} args - Arguments to create many GlobalAttributes.
     * @example
     * // Create many GlobalAttributes
     * const globalAttribute = await prisma.globalAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalAttributeCreateManyArgs>(args?: SelectSubset<T, GlobalAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GlobalAttribute.
     * @param {GlobalAttributeDeleteArgs} args - Arguments to delete one GlobalAttribute.
     * @example
     * // Delete one GlobalAttribute
     * const GlobalAttribute = await prisma.globalAttribute.delete({
     *   where: {
     *     // ... filter to delete one GlobalAttribute
     *   }
     * })
     * 
     */
    delete<T extends GlobalAttributeDeleteArgs>(args: SelectSubset<T, GlobalAttributeDeleteArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GlobalAttribute.
     * @param {GlobalAttributeUpdateArgs} args - Arguments to update one GlobalAttribute.
     * @example
     * // Update one GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalAttributeUpdateArgs>(args: SelectSubset<T, GlobalAttributeUpdateArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GlobalAttributes.
     * @param {GlobalAttributeDeleteManyArgs} args - Arguments to filter GlobalAttributes to delete.
     * @example
     * // Delete a few GlobalAttributes
     * const { count } = await prisma.globalAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalAttributeDeleteManyArgs>(args?: SelectSubset<T, GlobalAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalAttributes
     * const globalAttribute = await prisma.globalAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalAttributeUpdateManyArgs>(args: SelectSubset<T, GlobalAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalAttribute.
     * @param {GlobalAttributeUpsertArgs} args - Arguments to update or create a GlobalAttribute.
     * @example
     * // Update or create a GlobalAttribute
     * const globalAttribute = await prisma.globalAttribute.upsert({
     *   create: {
     *     // ... data to create a GlobalAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalAttribute we want to update
     *   }
     * })
     */
    upsert<T extends GlobalAttributeUpsertArgs>(args: SelectSubset<T, GlobalAttributeUpsertArgs<ExtArgs>>): Prisma__GlobalAttributeClient<$Result.GetResult<Prisma.$GlobalAttributePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GlobalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeCountArgs} args - Arguments to filter GlobalAttributes to count.
     * @example
     * // Count the number of GlobalAttributes
     * const count = await prisma.globalAttribute.count({
     *   where: {
     *     // ... the filter for the GlobalAttributes we want to count
     *   }
     * })
    **/
    count<T extends GlobalAttributeCountArgs>(
      args?: Subset<T, GlobalAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GlobalAttributeAggregateArgs>(args: Subset<T, GlobalAttributeAggregateArgs>): Prisma.PrismaPromise<GetGlobalAttributeAggregateType<T>>

    /**
     * Group by GlobalAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalAttributeGroupByArgs} args - Group by arguments.
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
      T extends GlobalAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalAttributeGroupByArgs['orderBy'] }
        : { orderBy?: GlobalAttributeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GlobalAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalAttribute model
   */
  readonly fields: GlobalAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the GlobalAttribute model
   */ 
  interface GlobalAttributeFieldRefs {
    readonly id: FieldRef<"GlobalAttribute", 'Int'>
    readonly companyId: FieldRef<"GlobalAttribute", 'Int'>
    readonly name: FieldRef<"GlobalAttribute", 'String'>
    readonly type: FieldRef<"GlobalAttribute", 'String'>
    readonly options: FieldRef<"GlobalAttribute", 'Json'>
    readonly createdAt: FieldRef<"GlobalAttribute", 'DateTime'>
    readonly updatedAt: FieldRef<"GlobalAttribute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalAttribute findUnique
   */
  export type GlobalAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter, which GlobalAttribute to fetch.
     */
    where: GlobalAttributeWhereUniqueInput
  }

  /**
   * GlobalAttribute findUniqueOrThrow
   */
  export type GlobalAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter, which GlobalAttribute to fetch.
     */
    where: GlobalAttributeWhereUniqueInput
  }

  /**
   * GlobalAttribute findFirst
   */
  export type GlobalAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter, which GlobalAttribute to fetch.
     */
    where?: GlobalAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAttributes to fetch.
     */
    orderBy?: GlobalAttributeOrderByWithRelationInput | GlobalAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalAttributes.
     */
    cursor?: GlobalAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalAttributes.
     */
    distinct?: GlobalAttributeScalarFieldEnum | GlobalAttributeScalarFieldEnum[]
  }

  /**
   * GlobalAttribute findFirstOrThrow
   */
  export type GlobalAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter, which GlobalAttribute to fetch.
     */
    where?: GlobalAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAttributes to fetch.
     */
    orderBy?: GlobalAttributeOrderByWithRelationInput | GlobalAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalAttributes.
     */
    cursor?: GlobalAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalAttributes.
     */
    distinct?: GlobalAttributeScalarFieldEnum | GlobalAttributeScalarFieldEnum[]
  }

  /**
   * GlobalAttribute findMany
   */
  export type GlobalAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter, which GlobalAttributes to fetch.
     */
    where?: GlobalAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalAttributes to fetch.
     */
    orderBy?: GlobalAttributeOrderByWithRelationInput | GlobalAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalAttributes.
     */
    cursor?: GlobalAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalAttributes.
     */
    skip?: number
    distinct?: GlobalAttributeScalarFieldEnum | GlobalAttributeScalarFieldEnum[]
  }

  /**
   * GlobalAttribute create
   */
  export type GlobalAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * The data needed to create a GlobalAttribute.
     */
    data: XOR<GlobalAttributeCreateInput, GlobalAttributeUncheckedCreateInput>
  }

  /**
   * GlobalAttribute createMany
   */
  export type GlobalAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalAttributes.
     */
    data: GlobalAttributeCreateManyInput | GlobalAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalAttribute update
   */
  export type GlobalAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * The data needed to update a GlobalAttribute.
     */
    data: XOR<GlobalAttributeUpdateInput, GlobalAttributeUncheckedUpdateInput>
    /**
     * Choose, which GlobalAttribute to update.
     */
    where: GlobalAttributeWhereUniqueInput
  }

  /**
   * GlobalAttribute updateMany
   */
  export type GlobalAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalAttributes.
     */
    data: XOR<GlobalAttributeUpdateManyMutationInput, GlobalAttributeUncheckedUpdateManyInput>
    /**
     * Filter which GlobalAttributes to update
     */
    where?: GlobalAttributeWhereInput
  }

  /**
   * GlobalAttribute upsert
   */
  export type GlobalAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * The filter to search for the GlobalAttribute to update in case it exists.
     */
    where: GlobalAttributeWhereUniqueInput
    /**
     * In case the GlobalAttribute found by the `where` argument doesn't exist, create a new GlobalAttribute with this data.
     */
    create: XOR<GlobalAttributeCreateInput, GlobalAttributeUncheckedCreateInput>
    /**
     * In case the GlobalAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalAttributeUpdateInput, GlobalAttributeUncheckedUpdateInput>
  }

  /**
   * GlobalAttribute delete
   */
  export type GlobalAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
    /**
     * Filter which GlobalAttribute to delete.
     */
    where: GlobalAttributeWhereUniqueInput
  }

  /**
   * GlobalAttribute deleteMany
   */
  export type GlobalAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalAttributes to delete
     */
    where?: GlobalAttributeWhereInput
  }

  /**
   * GlobalAttribute without action
   */
  export type GlobalAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalAttribute
     */
    select?: GlobalAttributeSelect<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type SupplierSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type SupplierMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    code: string | null
    contactPerson: string | null
    email: string | null
    phone: string | null
    address: string | null
    country: string | null
    state: string | null
    city: string | null
    zipCode: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    name: string | null
    code: string | null
    contactPerson: string | null
    email: string | null
    phone: string | null
    address: string | null
    country: string | null
    state: string | null
    city: string | null
    zipCode: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    code: number
    contactPerson: number
    email: number
    phone: number
    address: number
    country: number
    state: number
    city: number
    zipCode: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type SupplierSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type SupplierMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    contactPerson?: true
    email?: true
    phone?: true
    address?: true
    country?: true
    state?: true
    city?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    contactPerson?: true
    email?: true
    phone?: true
    address?: true
    country?: true
    state?: true
    city?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    contactPerson?: true
    email?: true
    phone?: true
    address?: true
    country?: true
    state?: true
    city?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _avg?: SupplierAvgAggregateInputType
    _sum?: SupplierSumAggregateInputType
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: number
    companyId: number
    name: string
    code: string | null
    contactPerson: string | null
    email: string | null
    phone: string | null
    address: string | null
    country: string | null
    state: string | null
    city: string | null
    zipCode: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    code?: boolean
    contactPerson?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Supplier$productsArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>


  export type SupplierSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    code?: boolean
    contactPerson?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    country?: boolean
    state?: boolean
    city?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Supplier$productsArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      products: Prisma.$ProductSupplierPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      name: string
      code: string | null
      contactPerson: string | null
      email: string | null
      phone: string | null
      address: string | null
      country: string | null
      state: string | null
      city: string | null
      zipCode: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
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
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Supplier$productsArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Supplier model
   */ 
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'Int'>
    readonly companyId: FieldRef<"Supplier", 'Int'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly code: FieldRef<"Supplier", 'String'>
    readonly contactPerson: FieldRef<"Supplier", 'String'>
    readonly email: FieldRef<"Supplier", 'String'>
    readonly phone: FieldRef<"Supplier", 'String'>
    readonly address: FieldRef<"Supplier", 'String'>
    readonly country: FieldRef<"Supplier", 'String'>
    readonly state: FieldRef<"Supplier", 'String'>
    readonly city: FieldRef<"Supplier", 'String'>
    readonly zipCode: FieldRef<"Supplier", 'String'>
    readonly status: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier.products
   */
  export type Supplier$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    where?: ProductSupplierWhereInput
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    cursor?: ProductSupplierWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductSupplierScalarFieldEnum | ProductSupplierScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model ProductSupplier
   */

  export type AggregateProductSupplier = {
    _count: ProductSupplierCountAggregateOutputType | null
    _avg: ProductSupplierAvgAggregateOutputType | null
    _sum: ProductSupplierSumAggregateOutputType | null
    _min: ProductSupplierMinAggregateOutputType | null
    _max: ProductSupplierMaxAggregateOutputType | null
  }

  export type ProductSupplierAvgAggregateOutputType = {
    productId: number | null
    supplierId: number | null
    purchasePrice: Decimal | null
    leadTime: number | null
  }

  export type ProductSupplierSumAggregateOutputType = {
    productId: number | null
    supplierId: number | null
    purchasePrice: Decimal | null
    leadTime: number | null
  }

  export type ProductSupplierMinAggregateOutputType = {
    productId: number | null
    supplierId: number | null
    purchasePrice: Decimal | null
    leadTime: number | null
    isDefault: boolean | null
  }

  export type ProductSupplierMaxAggregateOutputType = {
    productId: number | null
    supplierId: number | null
    purchasePrice: Decimal | null
    leadTime: number | null
    isDefault: boolean | null
  }

  export type ProductSupplierCountAggregateOutputType = {
    productId: number
    supplierId: number
    purchasePrice: number
    leadTime: number
    isDefault: number
    _all: number
  }


  export type ProductSupplierAvgAggregateInputType = {
    productId?: true
    supplierId?: true
    purchasePrice?: true
    leadTime?: true
  }

  export type ProductSupplierSumAggregateInputType = {
    productId?: true
    supplierId?: true
    purchasePrice?: true
    leadTime?: true
  }

  export type ProductSupplierMinAggregateInputType = {
    productId?: true
    supplierId?: true
    purchasePrice?: true
    leadTime?: true
    isDefault?: true
  }

  export type ProductSupplierMaxAggregateInputType = {
    productId?: true
    supplierId?: true
    purchasePrice?: true
    leadTime?: true
    isDefault?: true
  }

  export type ProductSupplierCountAggregateInputType = {
    productId?: true
    supplierId?: true
    purchasePrice?: true
    leadTime?: true
    isDefault?: true
    _all?: true
  }

  export type ProductSupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSupplier to aggregate.
     */
    where?: ProductSupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSuppliers to fetch.
     */
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductSupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSuppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSuppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductSuppliers
    **/
    _count?: true | ProductSupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductSupplierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSupplierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductSupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductSupplierMaxAggregateInputType
  }

  export type GetProductSupplierAggregateType<T extends ProductSupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateProductSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductSupplier[P]>
      : GetScalarType<T[P], AggregateProductSupplier[P]>
  }




  export type ProductSupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSupplierWhereInput
    orderBy?: ProductSupplierOrderByWithAggregationInput | ProductSupplierOrderByWithAggregationInput[]
    by: ProductSupplierScalarFieldEnum[] | ProductSupplierScalarFieldEnum
    having?: ProductSupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductSupplierCountAggregateInputType | true
    _avg?: ProductSupplierAvgAggregateInputType
    _sum?: ProductSupplierSumAggregateInputType
    _min?: ProductSupplierMinAggregateInputType
    _max?: ProductSupplierMaxAggregateInputType
  }

  export type ProductSupplierGroupByOutputType = {
    productId: number
    supplierId: number
    purchasePrice: Decimal | null
    leadTime: number | null
    isDefault: boolean
    _count: ProductSupplierCountAggregateOutputType | null
    _avg: ProductSupplierAvgAggregateOutputType | null
    _sum: ProductSupplierSumAggregateOutputType | null
    _min: ProductSupplierMinAggregateOutputType | null
    _max: ProductSupplierMaxAggregateOutputType | null
  }

  type GetProductSupplierGroupByPayload<T extends ProductSupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductSupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductSupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductSupplierGroupByOutputType[P]>
            : GetScalarType<T[P], ProductSupplierGroupByOutputType[P]>
        }
      >
    >


  export type ProductSupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    supplierId?: boolean
    purchasePrice?: boolean
    leadTime?: boolean
    isDefault?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSupplier"]>


  export type ProductSupplierSelectScalar = {
    productId?: boolean
    supplierId?: boolean
    purchasePrice?: boolean
    leadTime?: boolean
    isDefault?: boolean
  }

  export type ProductSupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }

  export type $ProductSupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductSupplier"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: number
      supplierId: number
      purchasePrice: Prisma.Decimal | null
      leadTime: number | null
      isDefault: boolean
    }, ExtArgs["result"]["productSupplier"]>
    composites: {}
  }

  type ProductSupplierGetPayload<S extends boolean | null | undefined | ProductSupplierDefaultArgs> = $Result.GetResult<Prisma.$ProductSupplierPayload, S>

  type ProductSupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductSupplierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductSupplierCountAggregateInputType | true
    }

  export interface ProductSupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductSupplier'], meta: { name: 'ProductSupplier' } }
    /**
     * Find zero or one ProductSupplier that matches the filter.
     * @param {ProductSupplierFindUniqueArgs} args - Arguments to find a ProductSupplier
     * @example
     * // Get one ProductSupplier
     * const productSupplier = await prisma.productSupplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductSupplierFindUniqueArgs>(args: SelectSubset<T, ProductSupplierFindUniqueArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductSupplier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductSupplierFindUniqueOrThrowArgs} args - Arguments to find a ProductSupplier
     * @example
     * // Get one ProductSupplier
     * const productSupplier = await prisma.productSupplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductSupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductSupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductSupplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierFindFirstArgs} args - Arguments to find a ProductSupplier
     * @example
     * // Get one ProductSupplier
     * const productSupplier = await prisma.productSupplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductSupplierFindFirstArgs>(args?: SelectSubset<T, ProductSupplierFindFirstArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductSupplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierFindFirstOrThrowArgs} args - Arguments to find a ProductSupplier
     * @example
     * // Get one ProductSupplier
     * const productSupplier = await prisma.productSupplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductSupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductSupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductSuppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductSuppliers
     * const productSuppliers = await prisma.productSupplier.findMany()
     * 
     * // Get first 10 ProductSuppliers
     * const productSuppliers = await prisma.productSupplier.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productSupplierWithProductIdOnly = await prisma.productSupplier.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductSupplierFindManyArgs>(args?: SelectSubset<T, ProductSupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductSupplier.
     * @param {ProductSupplierCreateArgs} args - Arguments to create a ProductSupplier.
     * @example
     * // Create one ProductSupplier
     * const ProductSupplier = await prisma.productSupplier.create({
     *   data: {
     *     // ... data to create a ProductSupplier
     *   }
     * })
     * 
     */
    create<T extends ProductSupplierCreateArgs>(args: SelectSubset<T, ProductSupplierCreateArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductSuppliers.
     * @param {ProductSupplierCreateManyArgs} args - Arguments to create many ProductSuppliers.
     * @example
     * // Create many ProductSuppliers
     * const productSupplier = await prisma.productSupplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductSupplierCreateManyArgs>(args?: SelectSubset<T, ProductSupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductSupplier.
     * @param {ProductSupplierDeleteArgs} args - Arguments to delete one ProductSupplier.
     * @example
     * // Delete one ProductSupplier
     * const ProductSupplier = await prisma.productSupplier.delete({
     *   where: {
     *     // ... filter to delete one ProductSupplier
     *   }
     * })
     * 
     */
    delete<T extends ProductSupplierDeleteArgs>(args: SelectSubset<T, ProductSupplierDeleteArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductSupplier.
     * @param {ProductSupplierUpdateArgs} args - Arguments to update one ProductSupplier.
     * @example
     * // Update one ProductSupplier
     * const productSupplier = await prisma.productSupplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductSupplierUpdateArgs>(args: SelectSubset<T, ProductSupplierUpdateArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductSuppliers.
     * @param {ProductSupplierDeleteManyArgs} args - Arguments to filter ProductSuppliers to delete.
     * @example
     * // Delete a few ProductSuppliers
     * const { count } = await prisma.productSupplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductSupplierDeleteManyArgs>(args?: SelectSubset<T, ProductSupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSuppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductSuppliers
     * const productSupplier = await prisma.productSupplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductSupplierUpdateManyArgs>(args: SelectSubset<T, ProductSupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductSupplier.
     * @param {ProductSupplierUpsertArgs} args - Arguments to update or create a ProductSupplier.
     * @example
     * // Update or create a ProductSupplier
     * const productSupplier = await prisma.productSupplier.upsert({
     *   create: {
     *     // ... data to create a ProductSupplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductSupplier we want to update
     *   }
     * })
     */
    upsert<T extends ProductSupplierUpsertArgs>(args: SelectSubset<T, ProductSupplierUpsertArgs<ExtArgs>>): Prisma__ProductSupplierClient<$Result.GetResult<Prisma.$ProductSupplierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductSuppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierCountArgs} args - Arguments to filter ProductSuppliers to count.
     * @example
     * // Count the number of ProductSuppliers
     * const count = await prisma.productSupplier.count({
     *   where: {
     *     // ... the filter for the ProductSuppliers we want to count
     *   }
     * })
    **/
    count<T extends ProductSupplierCountArgs>(
      args?: Subset<T, ProductSupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductSupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductSupplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductSupplierAggregateArgs>(args: Subset<T, ProductSupplierAggregateArgs>): Prisma.PrismaPromise<GetProductSupplierAggregateType<T>>

    /**
     * Group by ProductSupplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSupplierGroupByArgs} args - Group by arguments.
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
      T extends ProductSupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductSupplierGroupByArgs['orderBy'] }
        : { orderBy?: ProductSupplierGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductSupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductSupplier model
   */
  readonly fields: ProductSupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductSupplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductSupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductSupplier model
   */ 
  interface ProductSupplierFieldRefs {
    readonly productId: FieldRef<"ProductSupplier", 'Int'>
    readonly supplierId: FieldRef<"ProductSupplier", 'Int'>
    readonly purchasePrice: FieldRef<"ProductSupplier", 'Decimal'>
    readonly leadTime: FieldRef<"ProductSupplier", 'Int'>
    readonly isDefault: FieldRef<"ProductSupplier", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProductSupplier findUnique
   */
  export type ProductSupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter, which ProductSupplier to fetch.
     */
    where: ProductSupplierWhereUniqueInput
  }

  /**
   * ProductSupplier findUniqueOrThrow
   */
  export type ProductSupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter, which ProductSupplier to fetch.
     */
    where: ProductSupplierWhereUniqueInput
  }

  /**
   * ProductSupplier findFirst
   */
  export type ProductSupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter, which ProductSupplier to fetch.
     */
    where?: ProductSupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSuppliers to fetch.
     */
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSuppliers.
     */
    cursor?: ProductSupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSuppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSuppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSuppliers.
     */
    distinct?: ProductSupplierScalarFieldEnum | ProductSupplierScalarFieldEnum[]
  }

  /**
   * ProductSupplier findFirstOrThrow
   */
  export type ProductSupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter, which ProductSupplier to fetch.
     */
    where?: ProductSupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSuppliers to fetch.
     */
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSuppliers.
     */
    cursor?: ProductSupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSuppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSuppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSuppliers.
     */
    distinct?: ProductSupplierScalarFieldEnum | ProductSupplierScalarFieldEnum[]
  }

  /**
   * ProductSupplier findMany
   */
  export type ProductSupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter, which ProductSuppliers to fetch.
     */
    where?: ProductSupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSuppliers to fetch.
     */
    orderBy?: ProductSupplierOrderByWithRelationInput | ProductSupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductSuppliers.
     */
    cursor?: ProductSupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSuppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSuppliers.
     */
    skip?: number
    distinct?: ProductSupplierScalarFieldEnum | ProductSupplierScalarFieldEnum[]
  }

  /**
   * ProductSupplier create
   */
  export type ProductSupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductSupplier.
     */
    data: XOR<ProductSupplierCreateInput, ProductSupplierUncheckedCreateInput>
  }

  /**
   * ProductSupplier createMany
   */
  export type ProductSupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductSuppliers.
     */
    data: ProductSupplierCreateManyInput | ProductSupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductSupplier update
   */
  export type ProductSupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductSupplier.
     */
    data: XOR<ProductSupplierUpdateInput, ProductSupplierUncheckedUpdateInput>
    /**
     * Choose, which ProductSupplier to update.
     */
    where: ProductSupplierWhereUniqueInput
  }

  /**
   * ProductSupplier updateMany
   */
  export type ProductSupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductSuppliers.
     */
    data: XOR<ProductSupplierUpdateManyMutationInput, ProductSupplierUncheckedUpdateManyInput>
    /**
     * Filter which ProductSuppliers to update
     */
    where?: ProductSupplierWhereInput
  }

  /**
   * ProductSupplier upsert
   */
  export type ProductSupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductSupplier to update in case it exists.
     */
    where: ProductSupplierWhereUniqueInput
    /**
     * In case the ProductSupplier found by the `where` argument doesn't exist, create a new ProductSupplier with this data.
     */
    create: XOR<ProductSupplierCreateInput, ProductSupplierUncheckedCreateInput>
    /**
     * In case the ProductSupplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductSupplierUpdateInput, ProductSupplierUncheckedUpdateInput>
  }

  /**
   * ProductSupplier delete
   */
  export type ProductSupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
    /**
     * Filter which ProductSupplier to delete.
     */
    where: ProductSupplierWhereUniqueInput
  }

  /**
   * ProductSupplier deleteMany
   */
  export type ProductSupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSuppliers to delete
     */
    where?: ProductSupplierWhereInput
  }

  /**
   * ProductSupplier without action
   */
  export type ProductSupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSupplier
     */
    select?: ProductSupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSupplierInclude<ExtArgs> | null
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


  export const ProductScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    type: 'type',
    sku: 'sku',
    productIdentifierType: 'productIdentifierType',
    productIdentifierValue: 'productIdentifierValue',
    condition: 'condition',
    manufacturer: 'manufacturer',
    status: 'status',
    msrp: 'msrp',
    purchasePrice: 'purchasePrice',
    retailPrice: 'retailPrice',
    map: 'map',
    dimensionLength: 'dimensionLength',
    dimensionWidth: 'dimensionWidth',
    dimensionHeight: 'dimensionHeight',
    dimensionUnit: 'dimensionUnit',
    weightValue: 'weightValue',
    weightUnit: 'weightUnit',
    manufacturedCountry: 'manufacturedCountry',
    manufacturedState: 'manufacturedState',
    manufacturedCity: 'manufacturedCity',
    manufacturedPostalCode: 'manufacturedPostalCode',
    shortDescription: 'shortDescription',
    mainDescription: 'mainDescription',
    features: 'features',
    brandId: 'brandId',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductAttributeScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    name: 'name',
    value: 'value'
  };

  export type ProductAttributeScalarFieldEnum = (typeof ProductAttributeScalarFieldEnum)[keyof typeof ProductAttributeScalarFieldEnum]


  export const VariantScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    sku: 'sku',
    name: 'name',
    costPrice: 'costPrice',
    sellingPrice: 'sellingPrice',
    weight: 'weight',
    dimensions: 'dimensions',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VariantScalarFieldEnum = (typeof VariantScalarFieldEnum)[keyof typeof VariantScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    parentId: 'parentId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    description: 'description',
    logo: 'logo',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    url: 'url',
    isMain: 'isMain',
    order: 'order'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const VariantAttributeScalarFieldEnum: {
    id: 'id',
    variantId: 'variantId',
    name: 'name',
    value: 'value'
  };

  export type VariantAttributeScalarFieldEnum = (typeof VariantAttributeScalarFieldEnum)[keyof typeof VariantAttributeScalarFieldEnum]


  export const GlobalAttributeScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    type: 'type',
    options: 'options',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GlobalAttributeScalarFieldEnum = (typeof GlobalAttributeScalarFieldEnum)[keyof typeof GlobalAttributeScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    code: 'code',
    contactPerson: 'contactPerson',
    email: 'email',
    phone: 'phone',
    address: 'address',
    country: 'country',
    state: 'state',
    city: 'city',
    zipCode: 'zipCode',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const ProductSupplierScalarFieldEnum: {
    productId: 'productId',
    supplierId: 'supplierId',
    purchasePrice: 'purchasePrice',
    leadTime: 'leadTime',
    isDefault: 'isDefault'
  };

  export type ProductSupplierScalarFieldEnum = (typeof ProductSupplierScalarFieldEnum)[keyof typeof ProductSupplierScalarFieldEnum]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'ProductType'
   */
  export type EnumProductTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductType'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    companyId?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    type?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    sku?: StringNullableFilter<"Product"> | string | null
    productIdentifierType?: StringNullableFilter<"Product"> | string | null
    productIdentifierValue?: StringNullableFilter<"Product"> | string | null
    condition?: StringNullableFilter<"Product"> | string | null
    manufacturer?: StringNullableFilter<"Product"> | string | null
    status?: StringFilter<"Product"> | string
    msrp?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    retailPrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    map?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: StringNullableFilter<"Product"> | string | null
    weightValue?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    weightUnit?: StringNullableFilter<"Product"> | string | null
    manufacturedCountry?: StringNullableFilter<"Product"> | string | null
    manufacturedState?: StringNullableFilter<"Product"> | string | null
    manufacturedCity?: StringNullableFilter<"Product"> | string | null
    manufacturedPostalCode?: StringNullableFilter<"Product"> | string | null
    shortDescription?: StringNullableFilter<"Product"> | string | null
    mainDescription?: StringNullableFilter<"Product"> | string | null
    features?: JsonNullableFilter<"Product">
    brandId?: IntNullableFilter<"Product"> | number | null
    categoryId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    brand?: XOR<BrandNullableRelationFilter, BrandWhereInput> | null
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    variants?: VariantListRelationFilter
    images?: ProductImageListRelationFilter
    suppliers?: ProductSupplierListRelationFilter
    attributes?: ProductAttributeListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sku?: SortOrderInput | SortOrder
    productIdentifierType?: SortOrderInput | SortOrder
    productIdentifierValue?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    status?: SortOrder
    msrp?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    retailPrice?: SortOrderInput | SortOrder
    map?: SortOrderInput | SortOrder
    dimensionLength?: SortOrderInput | SortOrder
    dimensionWidth?: SortOrderInput | SortOrder
    dimensionHeight?: SortOrderInput | SortOrder
    dimensionUnit?: SortOrderInput | SortOrder
    weightValue?: SortOrderInput | SortOrder
    weightUnit?: SortOrderInput | SortOrder
    manufacturedCountry?: SortOrderInput | SortOrder
    manufacturedState?: SortOrderInput | SortOrder
    manufacturedCity?: SortOrderInput | SortOrder
    manufacturedPostalCode?: SortOrderInput | SortOrder
    shortDescription?: SortOrderInput | SortOrder
    mainDescription?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    brandId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brand?: BrandOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    variants?: VariantOrderByRelationAggregateInput
    images?: ProductImageOrderByRelationAggregateInput
    suppliers?: ProductSupplierOrderByRelationAggregateInput
    attributes?: ProductAttributeOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    companyId?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    type?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    productIdentifierType?: StringNullableFilter<"Product"> | string | null
    productIdentifierValue?: StringNullableFilter<"Product"> | string | null
    condition?: StringNullableFilter<"Product"> | string | null
    manufacturer?: StringNullableFilter<"Product"> | string | null
    status?: StringFilter<"Product"> | string
    msrp?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    retailPrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    map?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: StringNullableFilter<"Product"> | string | null
    weightValue?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    weightUnit?: StringNullableFilter<"Product"> | string | null
    manufacturedCountry?: StringNullableFilter<"Product"> | string | null
    manufacturedState?: StringNullableFilter<"Product"> | string | null
    manufacturedCity?: StringNullableFilter<"Product"> | string | null
    manufacturedPostalCode?: StringNullableFilter<"Product"> | string | null
    shortDescription?: StringNullableFilter<"Product"> | string | null
    mainDescription?: StringNullableFilter<"Product"> | string | null
    features?: JsonNullableFilter<"Product">
    brandId?: IntNullableFilter<"Product"> | number | null
    categoryId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    brand?: XOR<BrandNullableRelationFilter, BrandWhereInput> | null
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    variants?: VariantListRelationFilter
    images?: ProductImageListRelationFilter
    suppliers?: ProductSupplierListRelationFilter
    attributes?: ProductAttributeListRelationFilter
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sku?: SortOrderInput | SortOrder
    productIdentifierType?: SortOrderInput | SortOrder
    productIdentifierValue?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    status?: SortOrder
    msrp?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    retailPrice?: SortOrderInput | SortOrder
    map?: SortOrderInput | SortOrder
    dimensionLength?: SortOrderInput | SortOrder
    dimensionWidth?: SortOrderInput | SortOrder
    dimensionHeight?: SortOrderInput | SortOrder
    dimensionUnit?: SortOrderInput | SortOrder
    weightValue?: SortOrderInput | SortOrder
    weightUnit?: SortOrderInput | SortOrder
    manufacturedCountry?: SortOrderInput | SortOrder
    manufacturedState?: SortOrderInput | SortOrder
    manufacturedCity?: SortOrderInput | SortOrder
    manufacturedPostalCode?: SortOrderInput | SortOrder
    shortDescription?: SortOrderInput | SortOrder
    mainDescription?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    brandId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    companyId?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    type?: EnumProductTypeWithAggregatesFilter<"Product"> | $Enums.ProductType
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null
    productIdentifierType?: StringNullableWithAggregatesFilter<"Product"> | string | null
    productIdentifierValue?: StringNullableWithAggregatesFilter<"Product"> | string | null
    condition?: StringNullableWithAggregatesFilter<"Product"> | string | null
    manufacturer?: StringNullableWithAggregatesFilter<"Product"> | string | null
    status?: StringWithAggregatesFilter<"Product"> | string
    msrp?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    retailPrice?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    map?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: StringNullableWithAggregatesFilter<"Product"> | string | null
    weightValue?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    weightUnit?: StringNullableWithAggregatesFilter<"Product"> | string | null
    manufacturedCountry?: StringNullableWithAggregatesFilter<"Product"> | string | null
    manufacturedState?: StringNullableWithAggregatesFilter<"Product"> | string | null
    manufacturedCity?: StringNullableWithAggregatesFilter<"Product"> | string | null
    manufacturedPostalCode?: StringNullableWithAggregatesFilter<"Product"> | string | null
    shortDescription?: StringNullableWithAggregatesFilter<"Product"> | string | null
    mainDescription?: StringNullableWithAggregatesFilter<"Product"> | string | null
    features?: JsonNullableWithAggregatesFilter<"Product">
    brandId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    categoryId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductAttributeWhereInput = {
    AND?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    OR?: ProductAttributeWhereInput[]
    NOT?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    id?: IntFilter<"ProductAttribute"> | number
    productId?: IntFilter<"ProductAttribute"> | number
    name?: StringFilter<"ProductAttribute"> | string
    value?: StringFilter<"ProductAttribute"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductAttributeOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    value?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    OR?: ProductAttributeWhereInput[]
    NOT?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    productId?: IntFilter<"ProductAttribute"> | number
    name?: StringFilter<"ProductAttribute"> | string
    value?: StringFilter<"ProductAttribute"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    value?: SortOrder
    _count?: ProductAttributeCountOrderByAggregateInput
    _avg?: ProductAttributeAvgOrderByAggregateInput
    _max?: ProductAttributeMaxOrderByAggregateInput
    _min?: ProductAttributeMinOrderByAggregateInput
    _sum?: ProductAttributeSumOrderByAggregateInput
  }

  export type ProductAttributeScalarWhereWithAggregatesInput = {
    AND?: ProductAttributeScalarWhereWithAggregatesInput | ProductAttributeScalarWhereWithAggregatesInput[]
    OR?: ProductAttributeScalarWhereWithAggregatesInput[]
    NOT?: ProductAttributeScalarWhereWithAggregatesInput | ProductAttributeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductAttribute"> | number
    productId?: IntWithAggregatesFilter<"ProductAttribute"> | number
    name?: StringWithAggregatesFilter<"ProductAttribute"> | string
    value?: StringWithAggregatesFilter<"ProductAttribute"> | string
  }

  export type VariantWhereInput = {
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    id?: IntFilter<"Variant"> | number
    productId?: IntFilter<"Variant"> | number
    sku?: StringFilter<"Variant"> | string
    name?: StringNullableFilter<"Variant"> | string | null
    costPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    weight?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    dimensions?: StringNullableFilter<"Variant"> | string | null
    image?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    attributes?: VariantAttributeListRelationFilter
  }

  export type VariantOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrderInput | SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrderInput | SortOrder
    dimensions?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    attributes?: VariantAttributeOrderByRelationAggregateInput
  }

  export type VariantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sku?: string
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    productId?: IntFilter<"Variant"> | number
    name?: StringNullableFilter<"Variant"> | string | null
    costPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    weight?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    dimensions?: StringNullableFilter<"Variant"> | string | null
    image?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    attributes?: VariantAttributeListRelationFilter
  }, "id" | "sku">

  export type VariantOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrderInput | SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrderInput | SortOrder
    dimensions?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VariantCountOrderByAggregateInput
    _avg?: VariantAvgOrderByAggregateInput
    _max?: VariantMaxOrderByAggregateInput
    _min?: VariantMinOrderByAggregateInput
    _sum?: VariantSumOrderByAggregateInput
  }

  export type VariantScalarWhereWithAggregatesInput = {
    AND?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    OR?: VariantScalarWhereWithAggregatesInput[]
    NOT?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Variant"> | number
    productId?: IntWithAggregatesFilter<"Variant"> | number
    sku?: StringWithAggregatesFilter<"Variant"> | string
    name?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    costPrice?: DecimalWithAggregatesFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalWithAggregatesFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    weight?: DecimalNullableWithAggregatesFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    dimensions?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    image?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Variant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Variant"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    companyId?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    status?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    companyId?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    status?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    companyId?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    parentId?: IntNullableWithAggregatesFilter<"Category"> | number | null
    status?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    id?: IntFilter<"Brand"> | number
    companyId?: IntFilter<"Brand"> | number
    name?: StringFilter<"Brand"> | string
    description?: StringNullableFilter<"Brand"> | string | null
    logo?: StringNullableFilter<"Brand"> | string | null
    isActive?: BoolFilter<"Brand"> | boolean
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    products?: ProductListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    companyId?: IntFilter<"Brand"> | number
    name?: StringFilter<"Brand"> | string
    description?: StringNullableFilter<"Brand"> | string | null
    logo?: StringNullableFilter<"Brand"> | string | null
    isActive?: BoolFilter<"Brand"> | boolean
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    products?: ProductListRelationFilter
  }, "id">

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _avg?: BrandAvgOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
    _sum?: BrandSumOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Brand"> | number
    companyId?: IntWithAggregatesFilter<"Brand"> | number
    name?: StringWithAggregatesFilter<"Brand"> | string
    description?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Brand"> | string | null
    isActive?: BoolWithAggregatesFilter<"Brand"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    isMain?: BoolFilter<"ProductImage"> | boolean
    order?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    isMain?: SortOrder
    order?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    isMain?: BoolFilter<"ProductImage"> | boolean
    order?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    isMain?: SortOrder
    order?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductImage"> | number
    productId?: IntWithAggregatesFilter<"ProductImage"> | number
    url?: StringWithAggregatesFilter<"ProductImage"> | string
    isMain?: BoolWithAggregatesFilter<"ProductImage"> | boolean
    order?: IntWithAggregatesFilter<"ProductImage"> | number
  }

  export type VariantAttributeWhereInput = {
    AND?: VariantAttributeWhereInput | VariantAttributeWhereInput[]
    OR?: VariantAttributeWhereInput[]
    NOT?: VariantAttributeWhereInput | VariantAttributeWhereInput[]
    id?: IntFilter<"VariantAttribute"> | number
    variantId?: IntFilter<"VariantAttribute"> | number
    name?: StringFilter<"VariantAttribute"> | string
    value?: StringFilter<"VariantAttribute"> | string
    variant?: XOR<VariantRelationFilter, VariantWhereInput>
  }

  export type VariantAttributeOrderByWithRelationInput = {
    id?: SortOrder
    variantId?: SortOrder
    name?: SortOrder
    value?: SortOrder
    variant?: VariantOrderByWithRelationInput
  }

  export type VariantAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VariantAttributeWhereInput | VariantAttributeWhereInput[]
    OR?: VariantAttributeWhereInput[]
    NOT?: VariantAttributeWhereInput | VariantAttributeWhereInput[]
    variantId?: IntFilter<"VariantAttribute"> | number
    name?: StringFilter<"VariantAttribute"> | string
    value?: StringFilter<"VariantAttribute"> | string
    variant?: XOR<VariantRelationFilter, VariantWhereInput>
  }, "id">

  export type VariantAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    variantId?: SortOrder
    name?: SortOrder
    value?: SortOrder
    _count?: VariantAttributeCountOrderByAggregateInput
    _avg?: VariantAttributeAvgOrderByAggregateInput
    _max?: VariantAttributeMaxOrderByAggregateInput
    _min?: VariantAttributeMinOrderByAggregateInput
    _sum?: VariantAttributeSumOrderByAggregateInput
  }

  export type VariantAttributeScalarWhereWithAggregatesInput = {
    AND?: VariantAttributeScalarWhereWithAggregatesInput | VariantAttributeScalarWhereWithAggregatesInput[]
    OR?: VariantAttributeScalarWhereWithAggregatesInput[]
    NOT?: VariantAttributeScalarWhereWithAggregatesInput | VariantAttributeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VariantAttribute"> | number
    variantId?: IntWithAggregatesFilter<"VariantAttribute"> | number
    name?: StringWithAggregatesFilter<"VariantAttribute"> | string
    value?: StringWithAggregatesFilter<"VariantAttribute"> | string
  }

  export type GlobalAttributeWhereInput = {
    AND?: GlobalAttributeWhereInput | GlobalAttributeWhereInput[]
    OR?: GlobalAttributeWhereInput[]
    NOT?: GlobalAttributeWhereInput | GlobalAttributeWhereInput[]
    id?: IntFilter<"GlobalAttribute"> | number
    companyId?: IntFilter<"GlobalAttribute"> | number
    name?: StringFilter<"GlobalAttribute"> | string
    type?: StringFilter<"GlobalAttribute"> | string
    options?: JsonNullableFilter<"GlobalAttribute">
    createdAt?: DateTimeFilter<"GlobalAttribute"> | Date | string
    updatedAt?: DateTimeFilter<"GlobalAttribute"> | Date | string
  }

  export type GlobalAttributeOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GlobalAttributeWhereInput | GlobalAttributeWhereInput[]
    OR?: GlobalAttributeWhereInput[]
    NOT?: GlobalAttributeWhereInput | GlobalAttributeWhereInput[]
    companyId?: IntFilter<"GlobalAttribute"> | number
    name?: StringFilter<"GlobalAttribute"> | string
    type?: StringFilter<"GlobalAttribute"> | string
    options?: JsonNullableFilter<"GlobalAttribute">
    createdAt?: DateTimeFilter<"GlobalAttribute"> | Date | string
    updatedAt?: DateTimeFilter<"GlobalAttribute"> | Date | string
  }, "id">

  export type GlobalAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GlobalAttributeCountOrderByAggregateInput
    _avg?: GlobalAttributeAvgOrderByAggregateInput
    _max?: GlobalAttributeMaxOrderByAggregateInput
    _min?: GlobalAttributeMinOrderByAggregateInput
    _sum?: GlobalAttributeSumOrderByAggregateInput
  }

  export type GlobalAttributeScalarWhereWithAggregatesInput = {
    AND?: GlobalAttributeScalarWhereWithAggregatesInput | GlobalAttributeScalarWhereWithAggregatesInput[]
    OR?: GlobalAttributeScalarWhereWithAggregatesInput[]
    NOT?: GlobalAttributeScalarWhereWithAggregatesInput | GlobalAttributeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GlobalAttribute"> | number
    companyId?: IntWithAggregatesFilter<"GlobalAttribute"> | number
    name?: StringWithAggregatesFilter<"GlobalAttribute"> | string
    type?: StringWithAggregatesFilter<"GlobalAttribute"> | string
    options?: JsonNullableWithAggregatesFilter<"GlobalAttribute">
    createdAt?: DateTimeWithAggregatesFilter<"GlobalAttribute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GlobalAttribute"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: IntFilter<"Supplier"> | number
    companyId?: IntFilter<"Supplier"> | number
    name?: StringFilter<"Supplier"> | string
    code?: StringNullableFilter<"Supplier"> | string | null
    contactPerson?: StringNullableFilter<"Supplier"> | string | null
    email?: StringNullableFilter<"Supplier"> | string | null
    phone?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    country?: StringNullableFilter<"Supplier"> | string | null
    state?: StringNullableFilter<"Supplier"> | string | null
    city?: StringNullableFilter<"Supplier"> | string | null
    zipCode?: StringNullableFilter<"Supplier"> | string | null
    status?: StringFilter<"Supplier"> | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    products?: ProductSupplierListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    contactPerson?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductSupplierOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    companyId?: IntFilter<"Supplier"> | number
    name?: StringFilter<"Supplier"> | string
    code?: StringNullableFilter<"Supplier"> | string | null
    contactPerson?: StringNullableFilter<"Supplier"> | string | null
    email?: StringNullableFilter<"Supplier"> | string | null
    phone?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    country?: StringNullableFilter<"Supplier"> | string | null
    state?: StringNullableFilter<"Supplier"> | string | null
    city?: StringNullableFilter<"Supplier"> | string | null
    zipCode?: StringNullableFilter<"Supplier"> | string | null
    status?: StringFilter<"Supplier"> | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    products?: ProductSupplierListRelationFilter
  }, "id">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    contactPerson?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _avg?: SupplierAvgOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
    _sum?: SupplierSumOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Supplier"> | number
    companyId?: IntWithAggregatesFilter<"Supplier"> | number
    name?: StringWithAggregatesFilter<"Supplier"> | string
    code?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    contactPerson?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    email?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    address?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    country?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    state?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    city?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    status?: StringWithAggregatesFilter<"Supplier"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type ProductSupplierWhereInput = {
    AND?: ProductSupplierWhereInput | ProductSupplierWhereInput[]
    OR?: ProductSupplierWhereInput[]
    NOT?: ProductSupplierWhereInput | ProductSupplierWhereInput[]
    productId?: IntFilter<"ProductSupplier"> | number
    supplierId?: IntFilter<"ProductSupplier"> | number
    purchasePrice?: DecimalNullableFilter<"ProductSupplier"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableFilter<"ProductSupplier"> | number | null
    isDefault?: BoolFilter<"ProductSupplier"> | boolean
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
  }

  export type ProductSupplierOrderByWithRelationInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    leadTime?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    product?: ProductOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
  }

  export type ProductSupplierWhereUniqueInput = Prisma.AtLeast<{
    productId_supplierId?: ProductSupplierProductIdSupplierIdCompoundUniqueInput
    AND?: ProductSupplierWhereInput | ProductSupplierWhereInput[]
    OR?: ProductSupplierWhereInput[]
    NOT?: ProductSupplierWhereInput | ProductSupplierWhereInput[]
    productId?: IntFilter<"ProductSupplier"> | number
    supplierId?: IntFilter<"ProductSupplier"> | number
    purchasePrice?: DecimalNullableFilter<"ProductSupplier"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableFilter<"ProductSupplier"> | number | null
    isDefault?: BoolFilter<"ProductSupplier"> | boolean
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
  }, "productId_supplierId">

  export type ProductSupplierOrderByWithAggregationInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    leadTime?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    _count?: ProductSupplierCountOrderByAggregateInput
    _avg?: ProductSupplierAvgOrderByAggregateInput
    _max?: ProductSupplierMaxOrderByAggregateInput
    _min?: ProductSupplierMinOrderByAggregateInput
    _sum?: ProductSupplierSumOrderByAggregateInput
  }

  export type ProductSupplierScalarWhereWithAggregatesInput = {
    AND?: ProductSupplierScalarWhereWithAggregatesInput | ProductSupplierScalarWhereWithAggregatesInput[]
    OR?: ProductSupplierScalarWhereWithAggregatesInput[]
    NOT?: ProductSupplierScalarWhereWithAggregatesInput | ProductSupplierScalarWhereWithAggregatesInput[]
    productId?: IntWithAggregatesFilter<"ProductSupplier"> | number
    supplierId?: IntWithAggregatesFilter<"ProductSupplier"> | number
    purchasePrice?: DecimalNullableWithAggregatesFilter<"ProductSupplier"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableWithAggregatesFilter<"ProductSupplier"> | number | null
    isDefault?: BoolWithAggregatesFilter<"ProductSupplier"> | boolean
  }

  export type ProductCreateInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    category?: CategoryCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductAttributeCreateInput = {
    name: string
    value: string
    product: ProductCreateNestedOneWithoutAttributesInput
  }

  export type ProductAttributeUncheckedCreateInput = {
    id?: number
    productId: number
    name: string
    value: string
  }

  export type ProductAttributeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeCreateManyInput = {
    id?: number
    productId: number
    name: string
    value: string
  }

  export type ProductAttributeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantCreateInput = {
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    attributes?: VariantAttributeCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateInput = {
    id?: number
    productId: number
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: VariantAttributeUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantUpdateInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    attributes?: VariantAttributeUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: VariantAttributeUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VariantCreateManyInput = {
    id?: number
    productId: number
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VariantUpdateManyMutationInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VariantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    parentId?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    companyId: number
    name: string
    parentId?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandCreateInput = {
    companyId: number
    name: string
    description?: string | null
    logo?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    description?: string | null
    logo?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: number
    companyId: number
    name: string
    description?: string | null
    logo?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateInput = {
    url: string
    isMain?: boolean
    order?: number
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    id?: number
    productId: number
    url: string
    isMain?: boolean
    order?: number
  }

  export type ProductImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageCreateManyInput = {
    id?: number
    productId: number
    url: string
    isMain?: boolean
    order?: number
  }

  export type ProductImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type VariantAttributeCreateInput = {
    name: string
    value: string
    variant: VariantCreateNestedOneWithoutAttributesInput
  }

  export type VariantAttributeUncheckedCreateInput = {
    id?: number
    variantId: number
    name: string
    value: string
  }

  export type VariantAttributeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    variant?: VariantUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type VariantAttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantAttributeCreateManyInput = {
    id?: number
    variantId: number
    name: string
    value: string
  }

  export type VariantAttributeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantAttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GlobalAttributeCreateInput = {
    companyId: number
    name: string
    type?: string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalAttributeUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    type?: string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalAttributeUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAttributeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAttributeCreateManyInput = {
    id?: number
    companyId: number
    name: string
    type?: string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalAttributeUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalAttributeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    companyId: number
    name: string
    code?: string | null
    contactPerson?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    country?: string | null
    state?: string | null
    city?: string | null
    zipCode?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductSupplierCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: number
    companyId: number
    name: string
    code?: string | null
    contactPerson?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    country?: string | null
    state?: string | null
    city?: string | null
    zipCode?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductSupplierUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductSupplierUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductSupplierUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: number
    companyId: number
    name: string
    code?: string | null
    contactPerson?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    country?: string | null
    state?: string | null
    city?: string | null
    zipCode?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSupplierCreateInput = {
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
    product: ProductCreateNestedOneWithoutSuppliersInput
    supplier: SupplierCreateNestedOneWithoutProductsInput
  }

  export type ProductSupplierUncheckedCreateInput = {
    productId: number
    supplierId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductSupplierUpdateInput = {
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    product?: ProductUpdateOneRequiredWithoutSuppliersNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductSupplierUncheckedUpdateInput = {
    productId?: IntFieldUpdateOperationsInput | number
    supplierId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductSupplierCreateManyInput = {
    productId: number
    supplierId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductSupplierUpdateManyMutationInput = {
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductSupplierUncheckedUpdateManyInput = {
    productId?: IntFieldUpdateOperationsInput | number
    supplierId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
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

  export type EnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[]
    notIn?: $Enums.ProductType[]
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type BrandNullableRelationFilter = {
    is?: BrandWhereInput | null
    isNot?: BrandWhereInput | null
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type VariantListRelationFilter = {
    every?: VariantWhereInput
    some?: VariantWhereInput
    none?: VariantWhereInput
  }

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type ProductSupplierListRelationFilter = {
    every?: ProductSupplierWhereInput
    some?: ProductSupplierWhereInput
    none?: ProductSupplierWhereInput
  }

  export type ProductAttributeListRelationFilter = {
    every?: ProductAttributeWhereInput
    some?: ProductAttributeWhereInput
    none?: ProductAttributeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductSupplierOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sku?: SortOrder
    productIdentifierType?: SortOrder
    productIdentifierValue?: SortOrder
    condition?: SortOrder
    manufacturer?: SortOrder
    status?: SortOrder
    msrp?: SortOrder
    purchasePrice?: SortOrder
    retailPrice?: SortOrder
    map?: SortOrder
    dimensionLength?: SortOrder
    dimensionWidth?: SortOrder
    dimensionHeight?: SortOrder
    dimensionUnit?: SortOrder
    weightValue?: SortOrder
    weightUnit?: SortOrder
    manufacturedCountry?: SortOrder
    manufacturedState?: SortOrder
    manufacturedCity?: SortOrder
    manufacturedPostalCode?: SortOrder
    shortDescription?: SortOrder
    mainDescription?: SortOrder
    features?: SortOrder
    brandId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    msrp?: SortOrder
    purchasePrice?: SortOrder
    retailPrice?: SortOrder
    map?: SortOrder
    dimensionLength?: SortOrder
    dimensionWidth?: SortOrder
    dimensionHeight?: SortOrder
    weightValue?: SortOrder
    brandId?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sku?: SortOrder
    productIdentifierType?: SortOrder
    productIdentifierValue?: SortOrder
    condition?: SortOrder
    manufacturer?: SortOrder
    status?: SortOrder
    msrp?: SortOrder
    purchasePrice?: SortOrder
    retailPrice?: SortOrder
    map?: SortOrder
    dimensionLength?: SortOrder
    dimensionWidth?: SortOrder
    dimensionHeight?: SortOrder
    dimensionUnit?: SortOrder
    weightValue?: SortOrder
    weightUnit?: SortOrder
    manufacturedCountry?: SortOrder
    manufacturedState?: SortOrder
    manufacturedCity?: SortOrder
    manufacturedPostalCode?: SortOrder
    shortDescription?: SortOrder
    mainDescription?: SortOrder
    brandId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sku?: SortOrder
    productIdentifierType?: SortOrder
    productIdentifierValue?: SortOrder
    condition?: SortOrder
    manufacturer?: SortOrder
    status?: SortOrder
    msrp?: SortOrder
    purchasePrice?: SortOrder
    retailPrice?: SortOrder
    map?: SortOrder
    dimensionLength?: SortOrder
    dimensionWidth?: SortOrder
    dimensionHeight?: SortOrder
    dimensionUnit?: SortOrder
    weightValue?: SortOrder
    weightUnit?: SortOrder
    manufacturedCountry?: SortOrder
    manufacturedState?: SortOrder
    manufacturedCity?: SortOrder
    manufacturedPostalCode?: SortOrder
    shortDescription?: SortOrder
    mainDescription?: SortOrder
    brandId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    msrp?: SortOrder
    purchasePrice?: SortOrder
    retailPrice?: SortOrder
    map?: SortOrder
    dimensionLength?: SortOrder
    dimensionWidth?: SortOrder
    dimensionHeight?: SortOrder
    weightValue?: SortOrder
    brandId?: SortOrder
    categoryId?: SortOrder
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

  export type EnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[]
    notIn?: $Enums.ProductType[]
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type ProductAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type VariantAttributeListRelationFilter = {
    every?: VariantAttributeWhereInput
    some?: VariantAttributeWhereInput
    none?: VariantAttributeWhereInput
  }

  export type VariantAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VariantCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrder
    dimensions?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrder
  }

  export type VariantMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrder
    dimensions?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrder
    dimensions?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    costPrice?: SortOrder
    sellingPrice?: SortOrder
    weight?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    parentId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    parentId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    isMain?: SortOrder
    order?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    isMain?: SortOrder
    order?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    isMain?: SortOrder
    order?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
  }

  export type VariantRelationFilter = {
    is?: VariantWhereInput
    isNot?: VariantWhereInput
  }

  export type VariantAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type VariantAttributeAvgOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
  }

  export type VariantAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type VariantAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type VariantAttributeSumOrderByAggregateInput = {
    id?: SortOrder
    variantId?: SortOrder
  }

  export type GlobalAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    options?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalAttributeAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type GlobalAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalAttributeSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    contactPerson?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    contactPerson?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    contactPerson?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    country?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type SupplierRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type ProductSupplierProductIdSupplierIdCompoundUniqueInput = {
    productId: number
    supplierId: number
  }

  export type ProductSupplierCountOrderByAggregateInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrder
    leadTime?: SortOrder
    isDefault?: SortOrder
  }

  export type ProductSupplierAvgOrderByAggregateInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrder
    leadTime?: SortOrder
  }

  export type ProductSupplierMaxOrderByAggregateInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrder
    leadTime?: SortOrder
    isDefault?: SortOrder
  }

  export type ProductSupplierMinOrderByAggregateInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrder
    leadTime?: SortOrder
    isDefault?: SortOrder
  }

  export type ProductSupplierSumOrderByAggregateInput = {
    productId?: SortOrder
    supplierId?: SortOrder
    purchasePrice?: SortOrder
    leadTime?: SortOrder
  }

  export type BrandCreateNestedOneWithoutProductsInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    connect?: BrandWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type VariantCreateNestedManyWithoutProductInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductSupplierCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput> | ProductSupplierCreateWithoutProductInput[] | ProductSupplierUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutProductInput | ProductSupplierCreateOrConnectWithoutProductInput[]
    createMany?: ProductSupplierCreateManyProductInputEnvelope
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
  }

  export type ProductAttributeCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type VariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductSupplierUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput> | ProductSupplierCreateWithoutProductInput[] | ProductSupplierUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutProductInput | ProductSupplierCreateOrConnectWithoutProductInput[]
    createMany?: ProductSupplierCreateManyProductInputEnvelope
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
  }

  export type ProductAttributeUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
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

  export type EnumProductTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProductType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BrandUpdateOneWithoutProductsNestedInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    upsert?: BrandUpsertWithoutProductsInput
    disconnect?: BrandWhereInput | boolean
    delete?: BrandWhereInput | boolean
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutProductsInput, BrandUpdateWithoutProductsInput>, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type VariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutProductInput | VariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutProductInput | VariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutProductInput | VariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductSupplierUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput> | ProductSupplierCreateWithoutProductInput[] | ProductSupplierUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutProductInput | ProductSupplierCreateOrConnectWithoutProductInput[]
    upsert?: ProductSupplierUpsertWithWhereUniqueWithoutProductInput | ProductSupplierUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSupplierCreateManyProductInputEnvelope
    set?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    disconnect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    delete?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    update?: ProductSupplierUpdateWithWhereUniqueWithoutProductInput | ProductSupplierUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSupplierUpdateManyWithWhereWithoutProductInput | ProductSupplierUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
  }

  export type ProductAttributeUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutProductInput | ProductAttributeUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutProductInput | ProductAttributeUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutProductInput | ProductAttributeUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutProductInput | VariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutProductInput | VariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutProductInput | VariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductSupplierUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput> | ProductSupplierCreateWithoutProductInput[] | ProductSupplierUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutProductInput | ProductSupplierCreateOrConnectWithoutProductInput[]
    upsert?: ProductSupplierUpsertWithWhereUniqueWithoutProductInput | ProductSupplierUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSupplierCreateManyProductInputEnvelope
    set?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    disconnect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    delete?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    update?: ProductSupplierUpdateWithWhereUniqueWithoutProductInput | ProductSupplierUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSupplierUpdateManyWithWhereWithoutProductInput | ProductSupplierUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
  }

  export type ProductAttributeUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutProductInput | ProductAttributeUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutProductInput | ProductAttributeUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutProductInput | ProductAttributeUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutAttributesInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    upsert?: ProductUpsertWithoutAttributesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAttributesInput, ProductUpdateWithoutAttributesInput>, ProductUncheckedUpdateWithoutAttributesInput>
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type VariantAttributeCreateNestedManyWithoutVariantInput = {
    create?: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput> | VariantAttributeCreateWithoutVariantInput[] | VariantAttributeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VariantAttributeCreateOrConnectWithoutVariantInput | VariantAttributeCreateOrConnectWithoutVariantInput[]
    createMany?: VariantAttributeCreateManyVariantInputEnvelope
    connect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
  }

  export type VariantAttributeUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput> | VariantAttributeCreateWithoutVariantInput[] | VariantAttributeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VariantAttributeCreateOrConnectWithoutVariantInput | VariantAttributeCreateOrConnectWithoutVariantInput[]
    createMany?: VariantAttributeCreateManyVariantInputEnvelope
    connect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type VariantAttributeUpdateManyWithoutVariantNestedInput = {
    create?: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput> | VariantAttributeCreateWithoutVariantInput[] | VariantAttributeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VariantAttributeCreateOrConnectWithoutVariantInput | VariantAttributeCreateOrConnectWithoutVariantInput[]
    upsert?: VariantAttributeUpsertWithWhereUniqueWithoutVariantInput | VariantAttributeUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: VariantAttributeCreateManyVariantInputEnvelope
    set?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    disconnect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    delete?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    connect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    update?: VariantAttributeUpdateWithWhereUniqueWithoutVariantInput | VariantAttributeUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: VariantAttributeUpdateManyWithWhereWithoutVariantInput | VariantAttributeUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: VariantAttributeScalarWhereInput | VariantAttributeScalarWhereInput[]
  }

  export type VariantAttributeUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput> | VariantAttributeCreateWithoutVariantInput[] | VariantAttributeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VariantAttributeCreateOrConnectWithoutVariantInput | VariantAttributeCreateOrConnectWithoutVariantInput[]
    upsert?: VariantAttributeUpsertWithWhereUniqueWithoutVariantInput | VariantAttributeUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: VariantAttributeCreateManyVariantInputEnvelope
    set?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    disconnect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    delete?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    connect?: VariantAttributeWhereUniqueInput | VariantAttributeWhereUniqueInput[]
    update?: VariantAttributeUpdateWithWhereUniqueWithoutVariantInput | VariantAttributeUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: VariantAttributeUpdateManyWithWhereWithoutVariantInput | VariantAttributeUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: VariantAttributeScalarWhereInput | VariantAttributeScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type VariantCreateNestedOneWithoutAttributesInput = {
    create?: XOR<VariantCreateWithoutAttributesInput, VariantUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: VariantCreateOrConnectWithoutAttributesInput
    connect?: VariantWhereUniqueInput
  }

  export type VariantUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<VariantCreateWithoutAttributesInput, VariantUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: VariantCreateOrConnectWithoutAttributesInput
    upsert?: VariantUpsertWithoutAttributesInput
    connect?: VariantWhereUniqueInput
    update?: XOR<XOR<VariantUpdateToOneWithWhereWithoutAttributesInput, VariantUpdateWithoutAttributesInput>, VariantUncheckedUpdateWithoutAttributesInput>
  }

  export type ProductSupplierCreateNestedManyWithoutSupplierInput = {
    create?: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput> | ProductSupplierCreateWithoutSupplierInput[] | ProductSupplierUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutSupplierInput | ProductSupplierCreateOrConnectWithoutSupplierInput[]
    createMany?: ProductSupplierCreateManySupplierInputEnvelope
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
  }

  export type ProductSupplierUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput> | ProductSupplierCreateWithoutSupplierInput[] | ProductSupplierUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutSupplierInput | ProductSupplierCreateOrConnectWithoutSupplierInput[]
    createMany?: ProductSupplierCreateManySupplierInputEnvelope
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
  }

  export type ProductSupplierUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput> | ProductSupplierCreateWithoutSupplierInput[] | ProductSupplierUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutSupplierInput | ProductSupplierCreateOrConnectWithoutSupplierInput[]
    upsert?: ProductSupplierUpsertWithWhereUniqueWithoutSupplierInput | ProductSupplierUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: ProductSupplierCreateManySupplierInputEnvelope
    set?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    disconnect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    delete?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    update?: ProductSupplierUpdateWithWhereUniqueWithoutSupplierInput | ProductSupplierUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: ProductSupplierUpdateManyWithWhereWithoutSupplierInput | ProductSupplierUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
  }

  export type ProductSupplierUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput> | ProductSupplierCreateWithoutSupplierInput[] | ProductSupplierUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ProductSupplierCreateOrConnectWithoutSupplierInput | ProductSupplierCreateOrConnectWithoutSupplierInput[]
    upsert?: ProductSupplierUpsertWithWhereUniqueWithoutSupplierInput | ProductSupplierUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: ProductSupplierCreateManySupplierInputEnvelope
    set?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    disconnect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    delete?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    connect?: ProductSupplierWhereUniqueInput | ProductSupplierWhereUniqueInput[]
    update?: ProductSupplierUpdateWithWhereUniqueWithoutSupplierInput | ProductSupplierUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: ProductSupplierUpdateManyWithWhereWithoutSupplierInput | ProductSupplierUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutSuppliersInput = {
    create?: XOR<ProductCreateWithoutSuppliersInput, ProductUncheckedCreateWithoutSuppliersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSuppliersInput
    connect?: ProductWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutProductsInput = {
    create?: XOR<SupplierCreateWithoutProductsInput, SupplierUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutProductsInput
    connect?: SupplierWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutSuppliersNestedInput = {
    create?: XOR<ProductCreateWithoutSuppliersInput, ProductUncheckedCreateWithoutSuppliersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSuppliersInput
    upsert?: ProductUpsertWithoutSuppliersInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSuppliersInput, ProductUpdateWithoutSuppliersInput>, ProductUncheckedUpdateWithoutSuppliersInput>
  }

  export type SupplierUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<SupplierCreateWithoutProductsInput, SupplierUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutProductsInput
    upsert?: SupplierUpsertWithoutProductsInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutProductsInput, SupplierUpdateWithoutProductsInput>, SupplierUncheckedUpdateWithoutProductsInput>
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

  export type NestedEnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[]
    notIn?: $Enums.ProductType[]
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedEnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[]
    notIn?: $Enums.ProductType[]
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BrandCreateWithoutProductsInput = {
    companyId: number
    name: string
    description?: string | null
    logo?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandUncheckedCreateWithoutProductsInput = {
    id?: number
    companyId: number
    name: string
    description?: string | null
    logo?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandCreateOrConnectWithoutProductsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    companyId: number
    name: string
    parentId?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type VariantCreateWithoutProductInput = {
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: VariantAttributeCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateWithoutProductInput = {
    id?: number
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attributes?: VariantAttributeUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantCreateOrConnectWithoutProductInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput>
  }

  export type VariantCreateManyProductInputEnvelope = {
    data: VariantCreateManyProductInput | VariantCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductImageCreateWithoutProductInput = {
    url: string
    isMain?: boolean
    order?: number
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: number
    url: string
    isMain?: boolean
    order?: number
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductSupplierCreateWithoutProductInput = {
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
    supplier: SupplierCreateNestedOneWithoutProductsInput
  }

  export type ProductSupplierUncheckedCreateWithoutProductInput = {
    supplierId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductSupplierCreateOrConnectWithoutProductInput = {
    where: ProductSupplierWhereUniqueInput
    create: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput>
  }

  export type ProductSupplierCreateManyProductInputEnvelope = {
    data: ProductSupplierCreateManyProductInput | ProductSupplierCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductAttributeCreateWithoutProductInput = {
    name: string
    value: string
  }

  export type ProductAttributeUncheckedCreateWithoutProductInput = {
    id?: number
    name: string
    value: string
  }

  export type ProductAttributeCreateOrConnectWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    create: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeCreateManyProductInputEnvelope = {
    data: ProductAttributeCreateManyProductInput | ProductAttributeCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type BrandUpsertWithoutProductsInput = {
    update: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutProductsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type BrandUpdateWithoutProductsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type VariantUpsertWithWhereUniqueWithoutProductInput = {
    where: VariantWhereUniqueInput
    update: XOR<VariantUpdateWithoutProductInput, VariantUncheckedUpdateWithoutProductInput>
    create: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput>
  }

  export type VariantUpdateWithWhereUniqueWithoutProductInput = {
    where: VariantWhereUniqueInput
    data: XOR<VariantUpdateWithoutProductInput, VariantUncheckedUpdateWithoutProductInput>
  }

  export type VariantUpdateManyWithWhereWithoutProductInput = {
    where: VariantScalarWhereInput
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyWithoutProductInput>
  }

  export type VariantScalarWhereInput = {
    AND?: VariantScalarWhereInput | VariantScalarWhereInput[]
    OR?: VariantScalarWhereInput[]
    NOT?: VariantScalarWhereInput | VariantScalarWhereInput[]
    id?: IntFilter<"Variant"> | number
    productId?: IntFilter<"Variant"> | number
    sku?: StringFilter<"Variant"> | string
    name?: StringNullableFilter<"Variant"> | string | null
    costPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFilter<"Variant"> | Decimal | DecimalJsLike | number | string
    weight?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    dimensions?: StringNullableFilter<"Variant"> | string | null
    image?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    isMain?: BoolFilter<"ProductImage"> | boolean
    order?: IntFilter<"ProductImage"> | number
  }

  export type ProductSupplierUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductSupplierWhereUniqueInput
    update: XOR<ProductSupplierUpdateWithoutProductInput, ProductSupplierUncheckedUpdateWithoutProductInput>
    create: XOR<ProductSupplierCreateWithoutProductInput, ProductSupplierUncheckedCreateWithoutProductInput>
  }

  export type ProductSupplierUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductSupplierWhereUniqueInput
    data: XOR<ProductSupplierUpdateWithoutProductInput, ProductSupplierUncheckedUpdateWithoutProductInput>
  }

  export type ProductSupplierUpdateManyWithWhereWithoutProductInput = {
    where: ProductSupplierScalarWhereInput
    data: XOR<ProductSupplierUpdateManyMutationInput, ProductSupplierUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductSupplierScalarWhereInput = {
    AND?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
    OR?: ProductSupplierScalarWhereInput[]
    NOT?: ProductSupplierScalarWhereInput | ProductSupplierScalarWhereInput[]
    productId?: IntFilter<"ProductSupplier"> | number
    supplierId?: IntFilter<"ProductSupplier"> | number
    purchasePrice?: DecimalNullableFilter<"ProductSupplier"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableFilter<"ProductSupplier"> | number | null
    isDefault?: BoolFilter<"ProductSupplier"> | boolean
  }

  export type ProductAttributeUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    update: XOR<ProductAttributeUpdateWithoutProductInput, ProductAttributeUncheckedUpdateWithoutProductInput>
    create: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    data: XOR<ProductAttributeUpdateWithoutProductInput, ProductAttributeUncheckedUpdateWithoutProductInput>
  }

  export type ProductAttributeUpdateManyWithWhereWithoutProductInput = {
    where: ProductAttributeScalarWhereInput
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductAttributeScalarWhereInput = {
    AND?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
    OR?: ProductAttributeScalarWhereInput[]
    NOT?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
    id?: IntFilter<"ProductAttribute"> | number
    productId?: IntFilter<"ProductAttribute"> | number
    name?: StringFilter<"ProductAttribute"> | string
    value?: StringFilter<"ProductAttribute"> | string
  }

  export type ProductCreateWithoutAttributesInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    category?: CategoryCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAttributesInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAttributesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
  }

  export type ProductUpsertWithoutAttributesInput = {
    update: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAttributesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
  }

  export type ProductUpdateWithoutAttributesInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutVariantsInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    category?: CategoryCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type VariantAttributeCreateWithoutVariantInput = {
    name: string
    value: string
  }

  export type VariantAttributeUncheckedCreateWithoutVariantInput = {
    id?: number
    name: string
    value: string
  }

  export type VariantAttributeCreateOrConnectWithoutVariantInput = {
    where: VariantAttributeWhereUniqueInput
    create: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput>
  }

  export type VariantAttributeCreateManyVariantInputEnvelope = {
    data: VariantAttributeCreateManyVariantInput | VariantAttributeCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type VariantAttributeUpsertWithWhereUniqueWithoutVariantInput = {
    where: VariantAttributeWhereUniqueInput
    update: XOR<VariantAttributeUpdateWithoutVariantInput, VariantAttributeUncheckedUpdateWithoutVariantInput>
    create: XOR<VariantAttributeCreateWithoutVariantInput, VariantAttributeUncheckedCreateWithoutVariantInput>
  }

  export type VariantAttributeUpdateWithWhereUniqueWithoutVariantInput = {
    where: VariantAttributeWhereUniqueInput
    data: XOR<VariantAttributeUpdateWithoutVariantInput, VariantAttributeUncheckedUpdateWithoutVariantInput>
  }

  export type VariantAttributeUpdateManyWithWhereWithoutVariantInput = {
    where: VariantAttributeScalarWhereInput
    data: XOR<VariantAttributeUpdateManyMutationInput, VariantAttributeUncheckedUpdateManyWithoutVariantInput>
  }

  export type VariantAttributeScalarWhereInput = {
    AND?: VariantAttributeScalarWhereInput | VariantAttributeScalarWhereInput[]
    OR?: VariantAttributeScalarWhereInput[]
    NOT?: VariantAttributeScalarWhereInput | VariantAttributeScalarWhereInput[]
    id?: IntFilter<"VariantAttribute"> | number
    variantId?: IntFilter<"VariantAttribute"> | number
    name?: StringFilter<"VariantAttribute"> | string
    value?: StringFilter<"VariantAttribute"> | string
  }

  export type CategoryCreateWithoutChildrenInput = {
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: number
    companyId: number
    name: string
    parentId?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: number
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: IntFilter<"Category"> | number
    companyId?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    status?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    companyId?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    type?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    sku?: StringNullableFilter<"Product"> | string | null
    productIdentifierType?: StringNullableFilter<"Product"> | string | null
    productIdentifierValue?: StringNullableFilter<"Product"> | string | null
    condition?: StringNullableFilter<"Product"> | string | null
    manufacturer?: StringNullableFilter<"Product"> | string | null
    status?: StringFilter<"Product"> | string
    msrp?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    retailPrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    map?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: StringNullableFilter<"Product"> | string | null
    weightValue?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    weightUnit?: StringNullableFilter<"Product"> | string | null
    manufacturedCountry?: StringNullableFilter<"Product"> | string | null
    manufacturedState?: StringNullableFilter<"Product"> | string | null
    manufacturedCity?: StringNullableFilter<"Product"> | string | null
    manufacturedPostalCode?: StringNullableFilter<"Product"> | string | null
    shortDescription?: StringNullableFilter<"Product"> | string | null
    mainDescription?: StringNullableFilter<"Product"> | string | null
    features?: JsonNullableFilter<"Product">
    brandId?: IntNullableFilter<"Product"> | number | null
    categoryId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductCreateWithoutBrandInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutBrandInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBrandInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductCreateManyBrandInputEnvelope = {
    data: ProductCreateManyBrandInput | ProductCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
  }

  export type ProductUpdateManyWithWhereWithoutBrandInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutBrandInput>
  }

  export type ProductCreateWithoutImagesInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    category?: CategoryCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    suppliers?: ProductSupplierUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type VariantCreateWithoutAttributesInput = {
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
  }

  export type VariantUncheckedCreateWithoutAttributesInput = {
    id?: number
    productId: number
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VariantCreateOrConnectWithoutAttributesInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutAttributesInput, VariantUncheckedCreateWithoutAttributesInput>
  }

  export type VariantUpsertWithoutAttributesInput = {
    update: XOR<VariantUpdateWithoutAttributesInput, VariantUncheckedUpdateWithoutAttributesInput>
    create: XOR<VariantCreateWithoutAttributesInput, VariantUncheckedCreateWithoutAttributesInput>
    where?: VariantWhereInput
  }

  export type VariantUpdateToOneWithWhereWithoutAttributesInput = {
    where?: VariantWhereInput
    data: XOR<VariantUpdateWithoutAttributesInput, VariantUncheckedUpdateWithoutAttributesInput>
  }

  export type VariantUpdateWithoutAttributesInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type VariantUncheckedUpdateWithoutAttributesInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSupplierCreateWithoutSupplierInput = {
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
    product: ProductCreateNestedOneWithoutSuppliersInput
  }

  export type ProductSupplierUncheckedCreateWithoutSupplierInput = {
    productId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductSupplierCreateOrConnectWithoutSupplierInput = {
    where: ProductSupplierWhereUniqueInput
    create: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput>
  }

  export type ProductSupplierCreateManySupplierInputEnvelope = {
    data: ProductSupplierCreateManySupplierInput | ProductSupplierCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type ProductSupplierUpsertWithWhereUniqueWithoutSupplierInput = {
    where: ProductSupplierWhereUniqueInput
    update: XOR<ProductSupplierUpdateWithoutSupplierInput, ProductSupplierUncheckedUpdateWithoutSupplierInput>
    create: XOR<ProductSupplierCreateWithoutSupplierInput, ProductSupplierUncheckedCreateWithoutSupplierInput>
  }

  export type ProductSupplierUpdateWithWhereUniqueWithoutSupplierInput = {
    where: ProductSupplierWhereUniqueInput
    data: XOR<ProductSupplierUpdateWithoutSupplierInput, ProductSupplierUncheckedUpdateWithoutSupplierInput>
  }

  export type ProductSupplierUpdateManyWithWhereWithoutSupplierInput = {
    where: ProductSupplierScalarWhereInput
    data: XOR<ProductSupplierUpdateManyMutationInput, ProductSupplierUncheckedUpdateManyWithoutSupplierInput>
  }

  export type ProductCreateWithoutSuppliersInput = {
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    category?: CategoryCreateNestedOneWithoutProductsInput
    variants?: VariantCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSuppliersInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSuppliersInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSuppliersInput, ProductUncheckedCreateWithoutSuppliersInput>
  }

  export type SupplierCreateWithoutProductsInput = {
    companyId: number
    name: string
    code?: string | null
    contactPerson?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    country?: string | null
    state?: string | null
    city?: string | null
    zipCode?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutProductsInput = {
    id?: number
    companyId: number
    name: string
    code?: string | null
    contactPerson?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    country?: string | null
    state?: string | null
    city?: string | null
    zipCode?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutProductsInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutProductsInput, SupplierUncheckedCreateWithoutProductsInput>
  }

  export type ProductUpsertWithoutSuppliersInput = {
    update: XOR<ProductUpdateWithoutSuppliersInput, ProductUncheckedUpdateWithoutSuppliersInput>
    create: XOR<ProductCreateWithoutSuppliersInput, ProductUncheckedCreateWithoutSuppliersInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSuppliersInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSuppliersInput, ProductUncheckedUpdateWithoutSuppliersInput>
  }

  export type ProductUpdateWithoutSuppliersInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSuppliersInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type SupplierUpsertWithoutProductsInput = {
    update: XOR<SupplierUpdateWithoutProductsInput, SupplierUncheckedUpdateWithoutProductsInput>
    create: XOR<SupplierCreateWithoutProductsInput, SupplierUncheckedCreateWithoutProductsInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutProductsInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutProductsInput, SupplierUncheckedUpdateWithoutProductsInput>
  }

  export type SupplierUpdateWithoutProductsInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    contactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VariantCreateManyProductInput = {
    id?: number
    sku: string
    name?: string | null
    costPrice?: Decimal | DecimalJsLike | number | string
    sellingPrice?: Decimal | DecimalJsLike | number | string
    weight?: Decimal | DecimalJsLike | number | string | null
    dimensions?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageCreateManyProductInput = {
    id?: number
    url: string
    isMain?: boolean
    order?: number
  }

  export type ProductSupplierCreateManyProductInput = {
    supplierId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductAttributeCreateManyProductInput = {
    id?: number
    name: string
    value: string
  }

  export type VariantUpdateWithoutProductInput = {
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: VariantAttributeUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attributes?: VariantAttributeUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    costPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    isMain?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProductSupplierUpdateWithoutProductInput = {
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    supplier?: SupplierUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductSupplierUncheckedUpdateWithoutProductInput = {
    supplierId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductSupplierUncheckedUpdateManyWithoutProductInput = {
    supplierId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductAttributeUpdateWithoutProductInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantAttributeCreateManyVariantInput = {
    id?: number
    name: string
    value: string
  }

  export type VariantAttributeUpdateWithoutVariantInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantAttributeUncheckedUpdateWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type VariantAttributeUncheckedUpdateManyWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateManyParentInput = {
    id?: number
    companyId: number
    name: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateWithoutParentInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyBrandInput = {
    id?: number
    companyId: number
    name: string
    type?: $Enums.ProductType
    sku?: string | null
    productIdentifierType?: string | null
    productIdentifierValue?: string | null
    condition?: string | null
    manufacturer?: string | null
    status?: string
    msrp?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    retailPrice?: Decimal | DecimalJsLike | number | string | null
    map?: Decimal | DecimalJsLike | number | string | null
    dimensionLength?: Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: string | null
    weightValue?: Decimal | DecimalJsLike | number | string | null
    weightUnit?: string | null
    manufacturedCountry?: string | null
    manufacturedState?: string | null
    manufacturedCity?: string | null
    manufacturedPostalCode?: string | null
    shortDescription?: string | null
    mainDescription?: string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutBrandInput = {
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variants?: VariantUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    suppliers?: ProductSupplierUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierType?: NullableStringFieldUpdateOperationsInput | string | null
    productIdentifierValue?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    msrp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retailPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    map?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionLength?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionWidth?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionHeight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dimensionUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCountry?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedState?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedCity?: NullableStringFieldUpdateOperationsInput | string | null
    manufacturedPostalCode?: NullableStringFieldUpdateOperationsInput | string | null
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    mainDescription?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableJsonNullValueInput | InputJsonValue
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSupplierCreateManySupplierInput = {
    productId: number
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    isDefault?: boolean
  }

  export type ProductSupplierUpdateWithoutSupplierInput = {
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    product?: ProductUpdateOneRequiredWithoutSuppliersNestedInput
  }

  export type ProductSupplierUncheckedUpdateWithoutSupplierInput = {
    productId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductSupplierUncheckedUpdateManyWithoutSupplierInput = {
    productId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VariantCountOutputTypeDefaultArgs instead
     */
    export type VariantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VariantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BrandCountOutputTypeDefaultArgs instead
     */
    export type BrandCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BrandCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierCountOutputTypeDefaultArgs instead
     */
    export type SupplierCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductAttributeDefaultArgs instead
     */
    export type ProductAttributeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductAttributeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VariantDefaultArgs instead
     */
    export type VariantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VariantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BrandDefaultArgs instead
     */
    export type BrandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BrandDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductImageDefaultArgs instead
     */
    export type ProductImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VariantAttributeDefaultArgs instead
     */
    export type VariantAttributeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VariantAttributeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GlobalAttributeDefaultArgs instead
     */
    export type GlobalAttributeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GlobalAttributeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierDefaultArgs instead
     */
    export type SupplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductSupplierDefaultArgs instead
     */
    export type ProductSupplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductSupplierDefaultArgs<ExtArgs>

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