import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;

    if (searchTerm) {
      const searchFilter = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      } as FilterQuery<T>;
      this.modelQuery = this.modelQuery.find(searchFilter) as unknown as Query<
        T[],
        T
      >;
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludingImportant = [
      'search',
      'page',
      'limit',
      'sortOrder',
      'sortBy',
      'fields',
      'filter',
    ];

    // exclude query fields
    excludingImportant.forEach((key) => delete queryObj[key]);
    const author = this?.query?.filter;
    this.modelQuery = this.modelQuery.find({ author });

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    // skip = (page-1)*limit
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  sort() {
    let sortStr;

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      // "-price" othoba "price"
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);

    return this;
  }

  select() {
    let fields = '-__v';

    if (this?.query?.fields) {
      fields = (this?.query.fields as string)?.split(',').join(' ');
    }

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
