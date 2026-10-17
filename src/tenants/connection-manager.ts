import { AppError } from '../core/errors/AppError';
import { Tenant, mockTenantsDatabase } from './models/tenant';

export interface TenantConnectionContext {
  tenant: Tenant;
  dbSchemaName: string;
}

export class ConnectionManager {
  private static connectionPool = new Map<string, TenantConnectionContext>();


  public static resolveConnection(tenantSlug: string): TenantConnectionContext {
    if (this.connectionPool.has(tenantSlug)) {
      return this.connectionPool.get(tenantSlug)!;
    }

    const tenant = mockTenantsDatabase.find(t => t.slug === tenantSlug);

    if (!tenant) {
      throw new AppError(`Inquilino não cadastrado na plataforma SaaS: '${tenantSlug}'`, 404);
    }

    if (!tenant.isActive) {
      throw new AppError(`O acesso para o inquilino '${tenant.name}' está temporariamente suspenso.`, 403);
    }

    const context: TenantConnectionContext = {
      tenant,
      dbSchemaName: `tenant_schema_${tenant.slug.replace(/-/g, '_')}`
    };

    this.connectionPool.set(tenantSlug, context);
    return context;
  }

  public static clearPool(): void {
    this.connectionPool.clear();
  }
}
