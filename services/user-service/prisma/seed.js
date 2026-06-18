const { PrismaClient } = require('../src/prisma/generated-client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // 1. Seed Packages
  const plans = [
    {
      id: 1,
      name: 'Starter',
      price: 19.00,
      maxSeats: 2,
      features: [
        'Product Management',
        'Stock & Warehouses'
      ]
    },
    {
      id: 2,
      name: 'Pro',
      price: 49.00,
      maxSeats: 5,
      features: [
        'Product Management',
        'Stock & Warehouses',
        'Shopify Integration',
        'Marketplace Channels (Up to 3)',
        'Order Management'
      ]
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99.00,
      maxSeats: 999999, // unlimited
      features: [
        'Product Management',
        'Stock & Warehouses',
        'Shopify Integration',
        'Marketplace Channels (Unlimited)',
        'Order Management',
        'Full Audit Logging',
        'Priority Notifications'
      ]
    }
  ];

  console.log('Seeding subscription packages...');
  for (const plan of plans) {
    await prisma.package.upsert({
      where: { id: plan.id },
      update: {
        name: plan.name,
        price: plan.price,
        maxSeats: plan.maxSeats,
        features: plan.features
      },
      create: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        maxSeats: plan.maxSeats,
        features: plan.features
      }
    });
  }

  // 2. Seed Roles
  const roles = [
    { id: 1, name: 'SUPER_ADMIN', description: 'Overall system operator' },
    { id: 2, name: 'BUSINESS_ADMIN', description: 'Company owner / administrator' },
    { id: 3, name: 'TEAM_MANAGER', description: 'Manager with catalog and inventory access' },
    { id: 4, name: 'TEAM_MEMBER', description: 'Standard operative staff' },
    { id: 5, name: 'VIEWER', description: 'Read-only viewer' }
  ];

  console.log('Seeding system roles...');
  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {
        name: role.name,
        description: role.description
      },
      create: {
        id: role.id,
        name: role.name,
        description: role.description
      }
    });
  }

  // 3. Seed Permissions
  const permissions = [
    { id: 1, name: 'product:create', description: 'Add new products' },
    { id: 2, name: 'product:read', description: 'View product catalog' },
    { id: 3, name: 'product:update', description: 'Edit products' },
    { id: 4, name: 'product:delete', description: 'Archive products' },
    { id: 5, name: 'inventory:read', description: 'View warehouse stock' },
    { id: 6, name: 'inventory:update', description: 'Adjust stock levels' },
    { id: 7, name: 'shopify:sync', description: 'Link and sync Shopify store' },
    { id: 8, name: 'marketplace:manage', description: 'Configure sales channels' },
    { id: 9, name: 'audit:read', description: 'View tenant audit logs' },
    { id: 10, name: 'orders:read', description: 'View customer orders' },
    { id: 11, name: 'orders:manage', description: 'Process / ship orders' },
    { id: 12, name: 'notifications:read', description: 'View system alerts' }
  ];

  console.log('Seeding permissions...');
  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { id: perm.id },
      update: {
        name: perm.name,
        description: perm.description
      },
      create: {
        id: perm.id,
        name: perm.name,
        description: perm.description
      }
    });
  }

  // 4. Map Permissions to Roles (RolePermission)
  console.log('Mapping permissions to roles...');
  // Clear existing role permissions mapping to avoid primary key conflicts
  await prisma.rolePermission.deleteMany({});
  
  // BUSINESS_ADMIN gets all permissions (1-12)
  for (let i = 1; i <= 12; i++) {
    await prisma.rolePermission.create({
      data: {
        roleId: 2, // BUSINESS_ADMIN
        permissionId: i
      }
    });
  }

  // 5. Seed default Business Owner user
  console.log('Seeding default Business Admin user...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'john@cims.com' },
    update: {
      password: hashedPassword,
      name: 'John Doe',
      status: 'active'
    },
    create: {
      email: 'john@cims.com',
      password: hashedPassword,
      name: 'John Doe',
      status: 'active'
    }
  });

  // 6. Seed default Company for the user
  console.log('Seeding default Company...');
  // Find or create company
  let company = await prisma.company.findFirst({
    where: { ownerId: user.id }
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        name: 'Acme Corp',
        businessType: 'Retail',
        ownerId: user.id
      }
    });
  }

  // 7. Seed default Membership
  console.log('Creating company membership...');
  await prisma.membership.upsert({
    where: {
      userId_companyId: {
        userId: user.id,
        companyId: company.id
      }
    },
    update: {
      roleId: 2 // BUSINESS_ADMIN
    },
    create: {
      userId: user.id,
      companyId: company.id,
      roleId: 2 // BUSINESS_ADMIN
    }
  });

  // 8. Seed default active Enterprise Subscription
  console.log('Creating active Enterprise subscription for company...');
  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setDate(startsAt.getDate() + 30); // 30-day active period

  await prisma.subscription.upsert({
    where: { companyId: company.id },
    update: {
      packageId: 3, // Enterprise
      status: 'active',
      startsAt,
      endsAt
    },
    create: {
      companyId: company.id,
      packageId: 3, // Enterprise
      status: 'active',
      startsAt,
      endsAt
    }
  });

  console.log('Seeding complete! Admin Login: john@cims.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
