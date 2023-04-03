-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "coverImageUrl" VARCHAR(256) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "content" TEXT NOT NULL,
    "status" SMALLINT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTopic_AB_unique" ON "_ArticleToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTopic_B_index" ON "_ArticleToTopic"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToTopic" ADD CONSTRAINT "_ArticleToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTopic" ADD CONSTRAINT "_ArticleToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
