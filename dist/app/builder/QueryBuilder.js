"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (searchTerm) {
            const searchFilter = {
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            };
            this.modelQuery = this.modelQuery.find(searchFilter);
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
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
        if (this.query.filter) {
            queryObj.author = this.query.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        // skip = (page-1)*limit
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    sort() {
        var _a, _b, _c, _d;
        let sortStr;
        if (((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) && ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder)) {
            const sortBy = (_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.sortBy;
            const sortOrder = (_d = this === null || this === void 0 ? void 0 : this.query) === null || _d === void 0 ? void 0 : _d.sortOrder;
            // "-price" othoba "price"
            sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
        }
        this.modelQuery = this.modelQuery.sort(sortStr);
        return this;
    }
    select() {
        var _a, _b;
        let fields = '-__v';
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) {
            fields = (_b = this === null || this === void 0 ? void 0 : this.query.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ');
        }
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
