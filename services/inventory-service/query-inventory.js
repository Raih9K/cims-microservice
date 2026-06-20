const { PrismaClient } = require('./src/prisma/generated-client');
const prisma = new PrismaClient();

async function main() {
  const stockLevels = await prisma.stockLevel.findMany({
    include: {
      warehouse: true,
    }
  });
  console.log('StockLevels:', JSON.stringify(stockLevels, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
