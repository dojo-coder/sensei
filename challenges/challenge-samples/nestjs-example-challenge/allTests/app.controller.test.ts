import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './src/app.controller';
import { AppService } from './src/app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    controller = moduleRef.get<AppController>(AppController);
  });

  it('returns "Hello, World!" on GET /', () => {
    expect(controller.getHello()).toBe('Hello, World!');
  });

  it('returns a non-empty string', () => {
    expect(controller.getHello()).toBeTruthy();
    expect(controller.getHello().length).toBeGreaterThan(0);
  });

  it('returns a string (not an object)', () => {
    expect(typeof controller.getHello()).toBe('string');
  });

  it('does NOT return the comma-less variant', () => {
    expect(controller.getHello()).not.toBe('Hello World!');
  });

  it('the response is case-sensitive', () => {
    expect(controller.getHello()).not.toBe('hello, world!');
    expect(controller.getHello()).toBe('Hello, World!');
  });

  it('the response is exactly "Hello, World!" (no surrounding whitespace)', () => {
    expect(controller.getHello().trim()).toBe('Hello, World!');
    expect(controller.getHello()).not.toMatch(/^\s|\s$/);
  });
});
