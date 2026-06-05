-- Crear tabla CALENDARIO_DISTRIBUCION
CREATE TABLE IF NOT EXISTS calendario_distribucion (
  id_calendario SERIAL PRIMARY KEY,
  id_usuario_creador INT NOT NULL,
  nombre VARCHAR(255),
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_calendario_usuario FOREIGN KEY (id_usuario_creador) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Crear tabla DETALLE_DISTRIBUCION
CREATE TABLE IF NOT EXISTS detalle_distribucion (
  id_detalle SERIAL PRIMARY KEY,
  id_calendario INT NOT NULL,
  id_sector INT NOT NULL,
  dia_semana INT NOT NULL, -- 0=Domingo, 1=Lunes, ..., 6=Sábado
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_detalle_calendario FOREIGN KEY (id_calendario) REFERENCES calendario_distribucion(id_calendario) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_sector FOREIGN KEY (id_sector) REFERENCES sector(id_sector) ON DELETE CASCADE
);

-- Crear índices
CREATE INDEX idx_calendario_usuario ON calendario_distribucion(id_usuario_creador);
CREATE INDEX idx_detalle_calendario ON detalle_distribucion(id_calendario);
CREATE INDEX idx_detalle_sector ON detalle_distribucion(id_sector);
CREATE INDEX idx_detalle_dia ON detalle_distribucion(dia_semana);

-- Seed: Calendario ejemplo para todos los sectores
INSERT INTO calendario_distribucion (id_usuario_creador, nombre, descripcion)
VALUES (1, 'Calendario Semanal Actual', 'Distribución de agua semanal por sector')
ON CONFLICT DO NOTHING;

-- Horarios ejemplo: Lunes (1), Miércoles (3), Viernes (5) para Sector 1
INSERT INTO detalle_distribucion (id_calendario, id_sector, dia_semana, hora_inicio, hora_fin, descripcion)
VALUES
  (1, 1, 1, '06:00:00', '12:00:00', 'Zona Norte - Lunes'),
  (1, 1, 3, '06:00:00', '12:00:00', 'Zona Norte - Miércoles'),
  (1, 1, 5, '06:00:00', '12:00:00', 'Zona Norte - Viernes')
ON CONFLICT DO NOTHING;
