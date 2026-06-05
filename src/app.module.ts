import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SectoresModule } from './sectores/sectores.module';
import { HogaresModule } from './hogares/hogares.module';
import { TanquesModule } from './tanques/tanques.module';
import { NivelesModule } from './niveles/niveles.module';
import { LecturasModule } from './lecturas/lecturas.module';
import { PagosModule } from './pagos/pagos.module';
import { GastosModule } from './gastos/gastos.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ParametrosModule } from './parametros/parametros.module';
import { MorososModule } from './morosos/morosos.module';
import { UploadModule } from './upload/upload.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { DistribucionModule } from './distribucion/distribucion.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'sistema_agua_san_miguel',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsuariosModule,
    SectoresModule,
    HogaresModule,
    TanquesModule,
    NivelesModule,
    LecturasModule,
    PagosModule,
    GastosModule,
    IncidenciasModule,
    MantenimientosModule,
    AnunciosModule,
    NotificacionesModule,
    AuditoriaModule,
    ParametrosModule,
    MorososModule,
    UploadModule,
    ProveedoresModule,
    DistribucionModule,
    ReportesModule,
  ],
})
export class AppModule {}
// BD verificada: PostgreSQL localhost sistema_agua_san_miguel
