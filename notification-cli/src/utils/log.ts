import { Category, CategoryLogger, CategoryServiceFactory, CategoryConfiguration, LogLevel } from "typescript-logging";

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

// Create categories, they will autoregister themselves, one category without parent (root) and a child category.
export const log = new Category("Log");
