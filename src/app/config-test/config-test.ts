import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import {} from 'jasmine';

/**
 * This suite config has been created in order to avoid re-compilation of components after each tests.
 * When _instantiated is false, it forces angular test bed to re-create zone and injectable services.
 * I've gotten this reference from https://blog.angularindepth.com/angular-unit-testing-performance-34363b7345ba
 */
export const configureTestSuite = () => {
  const testBedApi: any = getTestBed();
  const originReset = TestBed.resetTestingModule;

  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
  });

  afterEach(() => {
    testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) =>
      fixture.destroy()
    );
    testBedApi._instantiated = false;
  });

  afterAll(() => {
    TestBed.resetTestingModule = originReset;
    TestBed.resetTestingModule();
  });
};
