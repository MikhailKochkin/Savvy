module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCase {
  count: Int!
}

type AggregateCoursePage {
  count: Int!
}

type AggregateSandbox {
  count: Int!
}

type AggregateSandboxPage {
  count: Int!
}

type AggregateTest {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Case {
  id: ID!
  title: String!
  description: String!
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  user: User!
  coursePage: CoursePage!
  coursePageID: ID!
}

type CaseConnection {
  pageInfo: PageInfo!
  edges: [CaseEdge]!
  aggregate: AggregateCase!
}

input CaseCreateInput {
  title: String!
  description: String!
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  user: UserCreateOneWithoutCasesInput!
  coursePage: CoursePageCreateOneWithoutCasesInput!
  coursePageID: ID!
}

input CaseCreateManyWithoutCoursePageInput {
  create: [CaseCreateWithoutCoursePageInput!]
  connect: [CaseWhereUniqueInput!]
}

input CaseCreateManyWithoutUserInput {
  create: [CaseCreateWithoutUserInput!]
  connect: [CaseWhereUniqueInput!]
}

input CaseCreateWithoutCoursePageInput {
  title: String!
  description: String!
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  user: UserCreateOneWithoutCasesInput!
  coursePageID: ID!
}

input CaseCreateWithoutUserInput {
  title: String!
  description: String!
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  coursePage: CoursePageCreateOneWithoutCasesInput!
  coursePageID: ID!
}

type CaseEdge {
  node: Case!
  cursor: String!
}

enum CaseOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  mainText_ASC
  mainText_DESC
  issue_ASC
  issue_DESC
  rule_ASC
  rule_DESC
  analysis_ASC
  analysis_DESC
  conclusion_ASC
  conclusion_DESC
  image_ASC
  image_DESC
  largeImage_ASC
  largeImage_DESC
  price_ASC
  price_DESC
  coursePageID_ASC
  coursePageID_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CasePreviousValues {
  id: ID!
  title: String!
  description: String!
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  coursePageID: ID!
}

type CaseSubscriptionPayload {
  mutation: MutationType!
  node: Case
  updatedFields: [String!]
  previousValues: CasePreviousValues
}

input CaseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CaseWhereInput
  AND: [CaseSubscriptionWhereInput!]
  OR: [CaseSubscriptionWhereInput!]
  NOT: [CaseSubscriptionWhereInput!]
}

input CaseUpdateInput {
  title: String
  description: String
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  user: UserUpdateOneRequiredWithoutCasesInput
  coursePage: CoursePageUpdateOneRequiredWithoutCasesInput
  coursePageID: ID
}

input CaseUpdateManyWithoutCoursePageInput {
  create: [CaseCreateWithoutCoursePageInput!]
  delete: [CaseWhereUniqueInput!]
  connect: [CaseWhereUniqueInput!]
  disconnect: [CaseWhereUniqueInput!]
  update: [CaseUpdateWithWhereUniqueWithoutCoursePageInput!]
  upsert: [CaseUpsertWithWhereUniqueWithoutCoursePageInput!]
}

input CaseUpdateManyWithoutUserInput {
  create: [CaseCreateWithoutUserInput!]
  delete: [CaseWhereUniqueInput!]
  connect: [CaseWhereUniqueInput!]
  disconnect: [CaseWhereUniqueInput!]
  update: [CaseUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [CaseUpsertWithWhereUniqueWithoutUserInput!]
}

input CaseUpdateWithoutCoursePageDataInput {
  title: String
  description: String
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  user: UserUpdateOneRequiredWithoutCasesInput
  coursePageID: ID
}

input CaseUpdateWithoutUserDataInput {
  title: String
  description: String
  mainText: String
  issue: String
  rule: String
  analysis: String
  conclusion: String
  image: String
  largeImage: String
  price: Int
  coursePage: CoursePageUpdateOneRequiredWithoutCasesInput
  coursePageID: ID
}

input CaseUpdateWithWhereUniqueWithoutCoursePageInput {
  where: CaseWhereUniqueInput!
  data: CaseUpdateWithoutCoursePageDataInput!
}

input CaseUpdateWithWhereUniqueWithoutUserInput {
  where: CaseWhereUniqueInput!
  data: CaseUpdateWithoutUserDataInput!
}

input CaseUpsertWithWhereUniqueWithoutCoursePageInput {
  where: CaseWhereUniqueInput!
  update: CaseUpdateWithoutCoursePageDataInput!
  create: CaseCreateWithoutCoursePageInput!
}

input CaseUpsertWithWhereUniqueWithoutUserInput {
  where: CaseWhereUniqueInput!
  update: CaseUpdateWithoutUserDataInput!
  create: CaseCreateWithoutUserInput!
}

input CaseWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  mainText: String
  mainText_not: String
  mainText_in: [String!]
  mainText_not_in: [String!]
  mainText_lt: String
  mainText_lte: String
  mainText_gt: String
  mainText_gte: String
  mainText_contains: String
  mainText_not_contains: String
  mainText_starts_with: String
  mainText_not_starts_with: String
  mainText_ends_with: String
  mainText_not_ends_with: String
  issue: String
  issue_not: String
  issue_in: [String!]
  issue_not_in: [String!]
  issue_lt: String
  issue_lte: String
  issue_gt: String
  issue_gte: String
  issue_contains: String
  issue_not_contains: String
  issue_starts_with: String
  issue_not_starts_with: String
  issue_ends_with: String
  issue_not_ends_with: String
  rule: String
  rule_not: String
  rule_in: [String!]
  rule_not_in: [String!]
  rule_lt: String
  rule_lte: String
  rule_gt: String
  rule_gte: String
  rule_contains: String
  rule_not_contains: String
  rule_starts_with: String
  rule_not_starts_with: String
  rule_ends_with: String
  rule_not_ends_with: String
  analysis: String
  analysis_not: String
  analysis_in: [String!]
  analysis_not_in: [String!]
  analysis_lt: String
  analysis_lte: String
  analysis_gt: String
  analysis_gte: String
  analysis_contains: String
  analysis_not_contains: String
  analysis_starts_with: String
  analysis_not_starts_with: String
  analysis_ends_with: String
  analysis_not_ends_with: String
  conclusion: String
  conclusion_not: String
  conclusion_in: [String!]
  conclusion_not_in: [String!]
  conclusion_lt: String
  conclusion_lte: String
  conclusion_gt: String
  conclusion_gte: String
  conclusion_contains: String
  conclusion_not_contains: String
  conclusion_starts_with: String
  conclusion_not_starts_with: String
  conclusion_ends_with: String
  conclusion_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  largeImage: String
  largeImage_not: String
  largeImage_in: [String!]
  largeImage_not_in: [String!]
  largeImage_lt: String
  largeImage_lte: String
  largeImage_gt: String
  largeImage_gte: String
  largeImage_contains: String
  largeImage_not_contains: String
  largeImage_starts_with: String
  largeImage_not_starts_with: String
  largeImage_ends_with: String
  largeImage_not_ends_with: String
  price: Int
  price_not: Int
  price_in: [Int!]
  price_not_in: [Int!]
  price_lt: Int
  price_lte: Int
  price_gt: Int
  price_gte: Int
  user: UserWhereInput
  coursePage: CoursePageWhereInput
  coursePageID: ID
  coursePageID_not: ID
  coursePageID_in: [ID!]
  coursePageID_not_in: [ID!]
  coursePageID_lt: ID
  coursePageID_lte: ID
  coursePageID_gt: ID
  coursePageID_gte: ID
  coursePageID_contains: ID
  coursePageID_not_contains: ID
  coursePageID_starts_with: ID
  coursePageID_not_starts_with: ID
  coursePageID_ends_with: ID
  coursePageID_not_ends_with: ID
  AND: [CaseWhereInput!]
  OR: [CaseWhereInput!]
  NOT: [CaseWhereInput!]
}

input CaseWhereUniqueInput {
  id: ID
}

type CoursePage {
  id: ID!
  title: String!
  description: String!
  image: String!
  user: User!
  cases(where: CaseWhereInput, orderBy: CaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Case!]
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
}

type CoursePageConnection {
  pageInfo: PageInfo!
  edges: [CoursePageEdge]!
  aggregate: AggregateCoursePage!
}

input CoursePageCreateInput {
  title: String!
  description: String!
  image: String!
  user: UserCreateOneWithoutCoursePagesInput!
  cases: CaseCreateManyWithoutCoursePageInput
  tests: TestCreateManyWithoutCoursePageInput
}

input CoursePageCreateManyWithoutUserInput {
  create: [CoursePageCreateWithoutUserInput!]
  connect: [CoursePageWhereUniqueInput!]
}

input CoursePageCreateOneWithoutCasesInput {
  create: CoursePageCreateWithoutCasesInput
  connect: CoursePageWhereUniqueInput
}

input CoursePageCreateOneWithoutTestsInput {
  create: CoursePageCreateWithoutTestsInput
  connect: CoursePageWhereUniqueInput
}

input CoursePageCreateWithoutCasesInput {
  title: String!
  description: String!
  image: String!
  user: UserCreateOneWithoutCoursePagesInput!
  tests: TestCreateManyWithoutCoursePageInput
}

input CoursePageCreateWithoutTestsInput {
  title: String!
  description: String!
  image: String!
  user: UserCreateOneWithoutCoursePagesInput!
  cases: CaseCreateManyWithoutCoursePageInput
}

input CoursePageCreateWithoutUserInput {
  title: String!
  description: String!
  image: String!
  cases: CaseCreateManyWithoutCoursePageInput
  tests: TestCreateManyWithoutCoursePageInput
}

type CoursePageEdge {
  node: CoursePage!
  cursor: String!
}

enum CoursePageOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  image_ASC
  image_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoursePagePreviousValues {
  id: ID!
  title: String!
  description: String!
  image: String!
}

type CoursePageSubscriptionPayload {
  mutation: MutationType!
  node: CoursePage
  updatedFields: [String!]
  previousValues: CoursePagePreviousValues
}

input CoursePageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CoursePageWhereInput
  AND: [CoursePageSubscriptionWhereInput!]
  OR: [CoursePageSubscriptionWhereInput!]
  NOT: [CoursePageSubscriptionWhereInput!]
}

input CoursePageUpdateInput {
  title: String
  description: String
  image: String
  user: UserUpdateOneRequiredWithoutCoursePagesInput
  cases: CaseUpdateManyWithoutCoursePageInput
  tests: TestUpdateManyWithoutCoursePageInput
}

input CoursePageUpdateManyWithoutUserInput {
  create: [CoursePageCreateWithoutUserInput!]
  delete: [CoursePageWhereUniqueInput!]
  connect: [CoursePageWhereUniqueInput!]
  disconnect: [CoursePageWhereUniqueInput!]
  update: [CoursePageUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [CoursePageUpsertWithWhereUniqueWithoutUserInput!]
}

input CoursePageUpdateOneRequiredWithoutCasesInput {
  create: CoursePageCreateWithoutCasesInput
  update: CoursePageUpdateWithoutCasesDataInput
  upsert: CoursePageUpsertWithoutCasesInput
  connect: CoursePageWhereUniqueInput
}

input CoursePageUpdateOneRequiredWithoutTestsInput {
  create: CoursePageCreateWithoutTestsInput
  update: CoursePageUpdateWithoutTestsDataInput
  upsert: CoursePageUpsertWithoutTestsInput
  connect: CoursePageWhereUniqueInput
}

input CoursePageUpdateWithoutCasesDataInput {
  title: String
  description: String
  image: String
  user: UserUpdateOneRequiredWithoutCoursePagesInput
  tests: TestUpdateManyWithoutCoursePageInput
}

input CoursePageUpdateWithoutTestsDataInput {
  title: String
  description: String
  image: String
  user: UserUpdateOneRequiredWithoutCoursePagesInput
  cases: CaseUpdateManyWithoutCoursePageInput
}

input CoursePageUpdateWithoutUserDataInput {
  title: String
  description: String
  image: String
  cases: CaseUpdateManyWithoutCoursePageInput
  tests: TestUpdateManyWithoutCoursePageInput
}

input CoursePageUpdateWithWhereUniqueWithoutUserInput {
  where: CoursePageWhereUniqueInput!
  data: CoursePageUpdateWithoutUserDataInput!
}

input CoursePageUpsertWithoutCasesInput {
  update: CoursePageUpdateWithoutCasesDataInput!
  create: CoursePageCreateWithoutCasesInput!
}

input CoursePageUpsertWithoutTestsInput {
  update: CoursePageUpdateWithoutTestsDataInput!
  create: CoursePageCreateWithoutTestsInput!
}

input CoursePageUpsertWithWhereUniqueWithoutUserInput {
  where: CoursePageWhereUniqueInput!
  update: CoursePageUpdateWithoutUserDataInput!
  create: CoursePageCreateWithoutUserInput!
}

input CoursePageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  user: UserWhereInput
  cases_every: CaseWhereInput
  cases_some: CaseWhereInput
  cases_none: CaseWhereInput
  tests_every: TestWhereInput
  tests_some: TestWhereInput
  tests_none: TestWhereInput
  AND: [CoursePageWhereInput!]
  OR: [CoursePageWhereInput!]
  NOT: [CoursePageWhereInput!]
}

input CoursePageWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createCase(data: CaseCreateInput!): Case!
  updateCase(data: CaseUpdateInput!, where: CaseWhereUniqueInput!): Case
  updateManyCases(data: CaseUpdateInput!, where: CaseWhereInput): BatchPayload!
  upsertCase(where: CaseWhereUniqueInput!, create: CaseCreateInput!, update: CaseUpdateInput!): Case!
  deleteCase(where: CaseWhereUniqueInput!): Case
  deleteManyCases(where: CaseWhereInput): BatchPayload!
  createCoursePage(data: CoursePageCreateInput!): CoursePage!
  updateCoursePage(data: CoursePageUpdateInput!, where: CoursePageWhereUniqueInput!): CoursePage
  updateManyCoursePages(data: CoursePageUpdateInput!, where: CoursePageWhereInput): BatchPayload!
  upsertCoursePage(where: CoursePageWhereUniqueInput!, create: CoursePageCreateInput!, update: CoursePageUpdateInput!): CoursePage!
  deleteCoursePage(where: CoursePageWhereUniqueInput!): CoursePage
  deleteManyCoursePages(where: CoursePageWhereInput): BatchPayload!
  createSandbox(data: SandboxCreateInput!): Sandbox!
  updateSandbox(data: SandboxUpdateInput!, where: SandboxWhereUniqueInput!): Sandbox
  updateManySandboxes(data: SandboxUpdateInput!, where: SandboxWhereInput): BatchPayload!
  upsertSandbox(where: SandboxWhereUniqueInput!, create: SandboxCreateInput!, update: SandboxUpdateInput!): Sandbox!
  deleteSandbox(where: SandboxWhereUniqueInput!): Sandbox
  deleteManySandboxes(where: SandboxWhereInput): BatchPayload!
  createSandboxPage(data: SandboxPageCreateInput!): SandboxPage!
  updateSandboxPage(data: SandboxPageUpdateInput!, where: SandboxPageWhereUniqueInput!): SandboxPage
  updateManySandboxPages(data: SandboxPageUpdateInput!, where: SandboxPageWhereInput): BatchPayload!
  upsertSandboxPage(where: SandboxPageWhereUniqueInput!, create: SandboxPageCreateInput!, update: SandboxPageUpdateInput!): SandboxPage!
  deleteSandboxPage(where: SandboxPageWhereUniqueInput!): SandboxPage
  deleteManySandboxPages(where: SandboxPageWhereInput): BatchPayload!
  createTest(data: TestCreateInput!): Test!
  updateTest(data: TestUpdateInput!, where: TestWhereUniqueInput!): Test
  updateManyTests(data: TestUpdateInput!, where: TestWhereInput): BatchPayload!
  upsertTest(where: TestWhereUniqueInput!, create: TestCreateInput!, update: TestUpdateInput!): Test!
  deleteTest(where: TestWhereUniqueInput!): Test
  deleteManyTests(where: TestWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum Permission {
  ADMIN
  USER
  CASECREATE
  CASEUPDATE
  CASEDELETE
  PERMISSIONUPDATE
}

type Query {
  case(where: CaseWhereUniqueInput!): Case
  cases(where: CaseWhereInput, orderBy: CaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Case]!
  casesConnection(where: CaseWhereInput, orderBy: CaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CaseConnection!
  coursePage(where: CoursePageWhereUniqueInput!): CoursePage
  coursePages(where: CoursePageWhereInput, orderBy: CoursePageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CoursePage]!
  coursePagesConnection(where: CoursePageWhereInput, orderBy: CoursePageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CoursePageConnection!
  sandbox(where: SandboxWhereUniqueInput!): Sandbox
  sandboxes(where: SandboxWhereInput, orderBy: SandboxOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sandbox]!
  sandboxesConnection(where: SandboxWhereInput, orderBy: SandboxOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SandboxConnection!
  sandboxPage(where: SandboxPageWhereUniqueInput!): SandboxPage
  sandboxPages(where: SandboxPageWhereInput, orderBy: SandboxPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SandboxPage]!
  sandboxPagesConnection(where: SandboxPageWhereInput, orderBy: SandboxPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SandboxPageConnection!
  test(where: TestWhereUniqueInput!): Test
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test]!
  testsConnection(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Sandbox {
  id: ID!
  text: String!
  user: User!
  sandboxPage: SandboxPage!
  sandboxPageID: ID!
}

type SandboxConnection {
  pageInfo: PageInfo!
  edges: [SandboxEdge]!
  aggregate: AggregateSandbox!
}

input SandboxCreateInput {
  text: String!
  user: UserCreateOneInput!
  sandboxPage: SandboxPageCreateOneWithoutSandboxesInput!
  sandboxPageID: ID!
}

input SandboxCreateManyWithoutSandboxPageInput {
  create: [SandboxCreateWithoutSandboxPageInput!]
  connect: [SandboxWhereUniqueInput!]
}

input SandboxCreateWithoutSandboxPageInput {
  text: String!
  user: UserCreateOneInput!
  sandboxPageID: ID!
}

type SandboxEdge {
  node: Sandbox!
  cursor: String!
}

enum SandboxOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  sandboxPageID_ASC
  sandboxPageID_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SandboxPage {
  id: ID!
  title: String!
  description: String!
  image: String!
  user: User!
  sandboxes(where: SandboxWhereInput, orderBy: SandboxOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sandbox!]
}

type SandboxPageConnection {
  pageInfo: PageInfo!
  edges: [SandboxPageEdge]!
  aggregate: AggregateSandboxPage!
}

input SandboxPageCreateInput {
  title: String!
  description: String!
  image: String!
  user: UserCreateOneWithoutSandboxPagesInput!
  sandboxes: SandboxCreateManyWithoutSandboxPageInput
}

input SandboxPageCreateManyWithoutUserInput {
  create: [SandboxPageCreateWithoutUserInput!]
  connect: [SandboxPageWhereUniqueInput!]
}

input SandboxPageCreateOneWithoutSandboxesInput {
  create: SandboxPageCreateWithoutSandboxesInput
  connect: SandboxPageWhereUniqueInput
}

input SandboxPageCreateWithoutSandboxesInput {
  title: String!
  description: String!
  image: String!
  user: UserCreateOneWithoutSandboxPagesInput!
}

input SandboxPageCreateWithoutUserInput {
  title: String!
  description: String!
  image: String!
  sandboxes: SandboxCreateManyWithoutSandboxPageInput
}

type SandboxPageEdge {
  node: SandboxPage!
  cursor: String!
}

enum SandboxPageOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  image_ASC
  image_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SandboxPagePreviousValues {
  id: ID!
  title: String!
  description: String!
  image: String!
}

type SandboxPageSubscriptionPayload {
  mutation: MutationType!
  node: SandboxPage
  updatedFields: [String!]
  previousValues: SandboxPagePreviousValues
}

input SandboxPageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SandboxPageWhereInput
  AND: [SandboxPageSubscriptionWhereInput!]
  OR: [SandboxPageSubscriptionWhereInput!]
  NOT: [SandboxPageSubscriptionWhereInput!]
}

input SandboxPageUpdateInput {
  title: String
  description: String
  image: String
  user: UserUpdateOneRequiredWithoutSandboxPagesInput
  sandboxes: SandboxUpdateManyWithoutSandboxPageInput
}

input SandboxPageUpdateManyWithoutUserInput {
  create: [SandboxPageCreateWithoutUserInput!]
  delete: [SandboxPageWhereUniqueInput!]
  connect: [SandboxPageWhereUniqueInput!]
  disconnect: [SandboxPageWhereUniqueInput!]
  update: [SandboxPageUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [SandboxPageUpsertWithWhereUniqueWithoutUserInput!]
}

input SandboxPageUpdateOneRequiredWithoutSandboxesInput {
  create: SandboxPageCreateWithoutSandboxesInput
  update: SandboxPageUpdateWithoutSandboxesDataInput
  upsert: SandboxPageUpsertWithoutSandboxesInput
  connect: SandboxPageWhereUniqueInput
}

input SandboxPageUpdateWithoutSandboxesDataInput {
  title: String
  description: String
  image: String
  user: UserUpdateOneRequiredWithoutSandboxPagesInput
}

input SandboxPageUpdateWithoutUserDataInput {
  title: String
  description: String
  image: String
  sandboxes: SandboxUpdateManyWithoutSandboxPageInput
}

input SandboxPageUpdateWithWhereUniqueWithoutUserInput {
  where: SandboxPageWhereUniqueInput!
  data: SandboxPageUpdateWithoutUserDataInput!
}

input SandboxPageUpsertWithoutSandboxesInput {
  update: SandboxPageUpdateWithoutSandboxesDataInput!
  create: SandboxPageCreateWithoutSandboxesInput!
}

input SandboxPageUpsertWithWhereUniqueWithoutUserInput {
  where: SandboxPageWhereUniqueInput!
  update: SandboxPageUpdateWithoutUserDataInput!
  create: SandboxPageCreateWithoutUserInput!
}

input SandboxPageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  user: UserWhereInput
  sandboxes_every: SandboxWhereInput
  sandboxes_some: SandboxWhereInput
  sandboxes_none: SandboxWhereInput
  AND: [SandboxPageWhereInput!]
  OR: [SandboxPageWhereInput!]
  NOT: [SandboxPageWhereInput!]
}

input SandboxPageWhereUniqueInput {
  id: ID
}

type SandboxPreviousValues {
  id: ID!
  text: String!
  sandboxPageID: ID!
}

type SandboxSubscriptionPayload {
  mutation: MutationType!
  node: Sandbox
  updatedFields: [String!]
  previousValues: SandboxPreviousValues
}

input SandboxSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SandboxWhereInput
  AND: [SandboxSubscriptionWhereInput!]
  OR: [SandboxSubscriptionWhereInput!]
  NOT: [SandboxSubscriptionWhereInput!]
}

input SandboxUpdateInput {
  text: String
  user: UserUpdateOneRequiredInput
  sandboxPage: SandboxPageUpdateOneRequiredWithoutSandboxesInput
  sandboxPageID: ID
}

input SandboxUpdateManyWithoutSandboxPageInput {
  create: [SandboxCreateWithoutSandboxPageInput!]
  delete: [SandboxWhereUniqueInput!]
  connect: [SandboxWhereUniqueInput!]
  disconnect: [SandboxWhereUniqueInput!]
  update: [SandboxUpdateWithWhereUniqueWithoutSandboxPageInput!]
  upsert: [SandboxUpsertWithWhereUniqueWithoutSandboxPageInput!]
}

input SandboxUpdateWithoutSandboxPageDataInput {
  text: String
  user: UserUpdateOneRequiredInput
  sandboxPageID: ID
}

input SandboxUpdateWithWhereUniqueWithoutSandboxPageInput {
  where: SandboxWhereUniqueInput!
  data: SandboxUpdateWithoutSandboxPageDataInput!
}

input SandboxUpsertWithWhereUniqueWithoutSandboxPageInput {
  where: SandboxWhereUniqueInput!
  update: SandboxUpdateWithoutSandboxPageDataInput!
  create: SandboxCreateWithoutSandboxPageInput!
}

input SandboxWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  user: UserWhereInput
  sandboxPage: SandboxPageWhereInput
  sandboxPageID: ID
  sandboxPageID_not: ID
  sandboxPageID_in: [ID!]
  sandboxPageID_not_in: [ID!]
  sandboxPageID_lt: ID
  sandboxPageID_lte: ID
  sandboxPageID_gt: ID
  sandboxPageID_gte: ID
  sandboxPageID_contains: ID
  sandboxPageID_not_contains: ID
  sandboxPageID_starts_with: ID
  sandboxPageID_not_starts_with: ID
  sandboxPageID_ends_with: ID
  sandboxPageID_not_ends_with: ID
  AND: [SandboxWhereInput!]
  OR: [SandboxWhereInput!]
  NOT: [SandboxWhereInput!]
}

input SandboxWhereUniqueInput {
  id: ID
}

type Subscription {
  case(where: CaseSubscriptionWhereInput): CaseSubscriptionPayload
  coursePage(where: CoursePageSubscriptionWhereInput): CoursePageSubscriptionPayload
  sandbox(where: SandboxSubscriptionWhereInput): SandboxSubscriptionPayload
  sandboxPage(where: SandboxPageSubscriptionWhereInput): SandboxPageSubscriptionPayload
  test(where: TestSubscriptionWhereInput): TestSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Test {
  id: ID!
  question: String!
  answer1: String!
  answer1Correct: String!
  answer2: String!
  answer2Correct: String!
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  user: User!
  coursePage: CoursePage!
  coursePageID: ID!
}

type TestConnection {
  pageInfo: PageInfo!
  edges: [TestEdge]!
  aggregate: AggregateTest!
}

input TestCreateInput {
  question: String!
  answer1: String!
  answer1Correct: String!
  answer2: String!
  answer2Correct: String!
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  user: UserCreateOneWithoutTestsInput!
  coursePage: CoursePageCreateOneWithoutTestsInput!
  coursePageID: ID!
}

input TestCreateManyWithoutCoursePageInput {
  create: [TestCreateWithoutCoursePageInput!]
  connect: [TestWhereUniqueInput!]
}

input TestCreateManyWithoutUserInput {
  create: [TestCreateWithoutUserInput!]
  connect: [TestWhereUniqueInput!]
}

input TestCreateWithoutCoursePageInput {
  question: String!
  answer1: String!
  answer1Correct: String!
  answer2: String!
  answer2Correct: String!
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  user: UserCreateOneWithoutTestsInput!
  coursePageID: ID!
}

input TestCreateWithoutUserInput {
  question: String!
  answer1: String!
  answer1Correct: String!
  answer2: String!
  answer2Correct: String!
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  coursePage: CoursePageCreateOneWithoutTestsInput!
  coursePageID: ID!
}

type TestEdge {
  node: Test!
  cursor: String!
}

enum TestOrderByInput {
  id_ASC
  id_DESC
  question_ASC
  question_DESC
  answer1_ASC
  answer1_DESC
  answer1Correct_ASC
  answer1Correct_DESC
  answer2_ASC
  answer2_DESC
  answer2Correct_ASC
  answer2Correct_DESC
  answer3_ASC
  answer3_DESC
  answer3Correct_ASC
  answer3Correct_DESC
  answer4_ASC
  answer4_DESC
  answer4Correct_ASC
  answer4Correct_DESC
  coursePageID_ASC
  coursePageID_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TestPreviousValues {
  id: ID!
  question: String!
  answer1: String!
  answer1Correct: String!
  answer2: String!
  answer2Correct: String!
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  coursePageID: ID!
}

type TestSubscriptionPayload {
  mutation: MutationType!
  node: Test
  updatedFields: [String!]
  previousValues: TestPreviousValues
}

input TestSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TestWhereInput
  AND: [TestSubscriptionWhereInput!]
  OR: [TestSubscriptionWhereInput!]
  NOT: [TestSubscriptionWhereInput!]
}

input TestUpdateInput {
  question: String
  answer1: String
  answer1Correct: String
  answer2: String
  answer2Correct: String
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  user: UserUpdateOneRequiredWithoutTestsInput
  coursePage: CoursePageUpdateOneRequiredWithoutTestsInput
  coursePageID: ID
}

input TestUpdateManyWithoutCoursePageInput {
  create: [TestCreateWithoutCoursePageInput!]
  delete: [TestWhereUniqueInput!]
  connect: [TestWhereUniqueInput!]
  disconnect: [TestWhereUniqueInput!]
  update: [TestUpdateWithWhereUniqueWithoutCoursePageInput!]
  upsert: [TestUpsertWithWhereUniqueWithoutCoursePageInput!]
}

input TestUpdateManyWithoutUserInput {
  create: [TestCreateWithoutUserInput!]
  delete: [TestWhereUniqueInput!]
  connect: [TestWhereUniqueInput!]
  disconnect: [TestWhereUniqueInput!]
  update: [TestUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TestUpsertWithWhereUniqueWithoutUserInput!]
}

input TestUpdateWithoutCoursePageDataInput {
  question: String
  answer1: String
  answer1Correct: String
  answer2: String
  answer2Correct: String
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  user: UserUpdateOneRequiredWithoutTestsInput
  coursePageID: ID
}

input TestUpdateWithoutUserDataInput {
  question: String
  answer1: String
  answer1Correct: String
  answer2: String
  answer2Correct: String
  answer3: String
  answer3Correct: String
  answer4: String
  answer4Correct: String
  coursePage: CoursePageUpdateOneRequiredWithoutTestsInput
  coursePageID: ID
}

input TestUpdateWithWhereUniqueWithoutCoursePageInput {
  where: TestWhereUniqueInput!
  data: TestUpdateWithoutCoursePageDataInput!
}

input TestUpdateWithWhereUniqueWithoutUserInput {
  where: TestWhereUniqueInput!
  data: TestUpdateWithoutUserDataInput!
}

input TestUpsertWithWhereUniqueWithoutCoursePageInput {
  where: TestWhereUniqueInput!
  update: TestUpdateWithoutCoursePageDataInput!
  create: TestCreateWithoutCoursePageInput!
}

input TestUpsertWithWhereUniqueWithoutUserInput {
  where: TestWhereUniqueInput!
  update: TestUpdateWithoutUserDataInput!
  create: TestCreateWithoutUserInput!
}

input TestWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  question: String
  question_not: String
  question_in: [String!]
  question_not_in: [String!]
  question_lt: String
  question_lte: String
  question_gt: String
  question_gte: String
  question_contains: String
  question_not_contains: String
  question_starts_with: String
  question_not_starts_with: String
  question_ends_with: String
  question_not_ends_with: String
  answer1: String
  answer1_not: String
  answer1_in: [String!]
  answer1_not_in: [String!]
  answer1_lt: String
  answer1_lte: String
  answer1_gt: String
  answer1_gte: String
  answer1_contains: String
  answer1_not_contains: String
  answer1_starts_with: String
  answer1_not_starts_with: String
  answer1_ends_with: String
  answer1_not_ends_with: String
  answer1Correct: String
  answer1Correct_not: String
  answer1Correct_in: [String!]
  answer1Correct_not_in: [String!]
  answer1Correct_lt: String
  answer1Correct_lte: String
  answer1Correct_gt: String
  answer1Correct_gte: String
  answer1Correct_contains: String
  answer1Correct_not_contains: String
  answer1Correct_starts_with: String
  answer1Correct_not_starts_with: String
  answer1Correct_ends_with: String
  answer1Correct_not_ends_with: String
  answer2: String
  answer2_not: String
  answer2_in: [String!]
  answer2_not_in: [String!]
  answer2_lt: String
  answer2_lte: String
  answer2_gt: String
  answer2_gte: String
  answer2_contains: String
  answer2_not_contains: String
  answer2_starts_with: String
  answer2_not_starts_with: String
  answer2_ends_with: String
  answer2_not_ends_with: String
  answer2Correct: String
  answer2Correct_not: String
  answer2Correct_in: [String!]
  answer2Correct_not_in: [String!]
  answer2Correct_lt: String
  answer2Correct_lte: String
  answer2Correct_gt: String
  answer2Correct_gte: String
  answer2Correct_contains: String
  answer2Correct_not_contains: String
  answer2Correct_starts_with: String
  answer2Correct_not_starts_with: String
  answer2Correct_ends_with: String
  answer2Correct_not_ends_with: String
  answer3: String
  answer3_not: String
  answer3_in: [String!]
  answer3_not_in: [String!]
  answer3_lt: String
  answer3_lte: String
  answer3_gt: String
  answer3_gte: String
  answer3_contains: String
  answer3_not_contains: String
  answer3_starts_with: String
  answer3_not_starts_with: String
  answer3_ends_with: String
  answer3_not_ends_with: String
  answer3Correct: String
  answer3Correct_not: String
  answer3Correct_in: [String!]
  answer3Correct_not_in: [String!]
  answer3Correct_lt: String
  answer3Correct_lte: String
  answer3Correct_gt: String
  answer3Correct_gte: String
  answer3Correct_contains: String
  answer3Correct_not_contains: String
  answer3Correct_starts_with: String
  answer3Correct_not_starts_with: String
  answer3Correct_ends_with: String
  answer3Correct_not_ends_with: String
  answer4: String
  answer4_not: String
  answer4_in: [String!]
  answer4_not_in: [String!]
  answer4_lt: String
  answer4_lte: String
  answer4_gt: String
  answer4_gte: String
  answer4_contains: String
  answer4_not_contains: String
  answer4_starts_with: String
  answer4_not_starts_with: String
  answer4_ends_with: String
  answer4_not_ends_with: String
  answer4Correct: String
  answer4Correct_not: String
  answer4Correct_in: [String!]
  answer4Correct_not_in: [String!]
  answer4Correct_lt: String
  answer4Correct_lte: String
  answer4Correct_gt: String
  answer4Correct_gte: String
  answer4Correct_contains: String
  answer4Correct_not_contains: String
  answer4Correct_starts_with: String
  answer4Correct_not_starts_with: String
  answer4Correct_ends_with: String
  answer4Correct_not_ends_with: String
  user: UserWhereInput
  coursePage: CoursePageWhereInput
  coursePageID: ID
  coursePageID_not: ID
  coursePageID_in: [ID!]
  coursePageID_not_in: [ID!]
  coursePageID_lt: ID
  coursePageID_lte: ID
  coursePageID_gt: ID
  coursePageID_gte: ID
  coursePageID_contains: ID
  coursePageID_not_contains: ID
  coursePageID_starts_with: ID
  coursePageID_not_starts_with: ID
  coursePageID_ends_with: ID
  coursePageID_not_ends_with: ID
  AND: [TestWhereInput!]
  OR: [TestWhereInput!]
  NOT: [TestWhereInput!]
}

input TestWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
  coursePages(where: CoursePageWhereInput, orderBy: CoursePageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CoursePage!]
  sandboxPages(where: SandboxPageWhereInput, orderBy: SandboxPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SandboxPage!]
  cases(where: CaseWhereInput, orderBy: CaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Case!]
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
  isFamiliar: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
  coursePages: CoursePageCreateManyWithoutUserInput
  sandboxPages: SandboxPageCreateManyWithoutUserInput
  cases: CaseCreateManyWithoutUserInput
  tests: TestCreateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCasesInput {
  create: UserCreateWithoutCasesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCoursePagesInput {
  create: UserCreateWithoutCoursePagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutSandboxPagesInput {
  create: UserCreateWithoutSandboxPagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreateWithoutCasesInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
  coursePages: CoursePageCreateManyWithoutUserInput
  sandboxPages: SandboxPageCreateManyWithoutUserInput
  tests: TestCreateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserCreateWithoutCoursePagesInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
  sandboxPages: SandboxPageCreateManyWithoutUserInput
  cases: CaseCreateManyWithoutUserInput
  tests: TestCreateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserCreateWithoutSandboxPagesInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
  coursePages: CoursePageCreateManyWithoutUserInput
  cases: CaseCreateManyWithoutUserInput
  tests: TestCreateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserCreateWithoutTestsInput {
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserCreatepermissionsInput
  coursePages: CoursePageCreateManyWithoutUserInput
  sandboxPages: SandboxPageCreateManyWithoutUserInput
  cases: CaseCreateManyWithoutUserInput
  isFamiliar: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  isFamiliar_ASC
  isFamiliar_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
  isFamiliar: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  coursePages: CoursePageUpdateManyWithoutUserInput
  sandboxPages: SandboxPageUpdateManyWithoutUserInput
  cases: CaseUpdateManyWithoutUserInput
  tests: TestUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  coursePages: CoursePageUpdateManyWithoutUserInput
  sandboxPages: SandboxPageUpdateManyWithoutUserInput
  cases: CaseUpdateManyWithoutUserInput
  tests: TestUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutCasesInput {
  create: UserCreateWithoutCasesInput
  update: UserUpdateWithoutCasesDataInput
  upsert: UserUpsertWithoutCasesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutCoursePagesInput {
  create: UserCreateWithoutCoursePagesInput
  update: UserUpdateWithoutCoursePagesDataInput
  upsert: UserUpsertWithoutCoursePagesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutSandboxPagesInput {
  create: UserCreateWithoutSandboxPagesInput
  update: UserUpdateWithoutSandboxPagesDataInput
  upsert: UserUpsertWithoutSandboxPagesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  update: UserUpdateWithoutTestsDataInput
  upsert: UserUpsertWithoutTestsInput
  connect: UserWhereUniqueInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdateWithoutCasesDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  coursePages: CoursePageUpdateManyWithoutUserInput
  sandboxPages: SandboxPageUpdateManyWithoutUserInput
  tests: TestUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpdateWithoutCoursePagesDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  sandboxPages: SandboxPageUpdateManyWithoutUserInput
  cases: CaseUpdateManyWithoutUserInput
  tests: TestUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpdateWithoutSandboxPagesDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  coursePages: CoursePageUpdateManyWithoutUserInput
  cases: CaseUpdateManyWithoutUserInput
  tests: TestUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpdateWithoutTestsDataInput {
  name: String
  email: String
  password: String
  resetToken: String
  resetTokenExpiry: Float
  permissions: UserUpdatepermissionsInput
  coursePages: CoursePageUpdateManyWithoutUserInput
  sandboxPages: SandboxPageUpdateManyWithoutUserInput
  cases: CaseUpdateManyWithoutUserInput
  isFamiliar: Boolean
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutCasesInput {
  update: UserUpdateWithoutCasesDataInput!
  create: UserCreateWithoutCasesInput!
}

input UserUpsertWithoutCoursePagesInput {
  update: UserUpdateWithoutCoursePagesDataInput!
  create: UserCreateWithoutCoursePagesInput!
}

input UserUpsertWithoutSandboxPagesInput {
  update: UserUpdateWithoutSandboxPagesDataInput!
  create: UserCreateWithoutSandboxPagesInput!
}

input UserUpsertWithoutTestsInput {
  update: UserUpdateWithoutTestsDataInput!
  create: UserCreateWithoutTestsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: Float
  resetTokenExpiry_not: Float
  resetTokenExpiry_in: [Float!]
  resetTokenExpiry_not_in: [Float!]
  resetTokenExpiry_lt: Float
  resetTokenExpiry_lte: Float
  resetTokenExpiry_gt: Float
  resetTokenExpiry_gte: Float
  coursePages_every: CoursePageWhereInput
  coursePages_some: CoursePageWhereInput
  coursePages_none: CoursePageWhereInput
  sandboxPages_every: SandboxPageWhereInput
  sandboxPages_some: SandboxPageWhereInput
  sandboxPages_none: SandboxPageWhereInput
  cases_every: CaseWhereInput
  cases_some: CaseWhereInput
  cases_none: CaseWhereInput
  tests_every: TestWhereInput
  tests_some: TestWhereInput
  tests_none: TestWhereInput
  isFamiliar: Boolean
  isFamiliar_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    