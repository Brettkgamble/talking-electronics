/* eslint-disable prettier/prettier */
import { PageBuilder } from "@/components/pagebuilder";
import { sanityFetch } from "@/lib/sanity/live";
import { queryHomePageData } from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";

// Blog Index Additions
import { notFound } from "next/navigation";

import { BlogCard, BlogHeader, FeaturedBlogCard } from "@/components/blog-card";
import { queryBlogIndexPageData } from "@/lib/sanity/query";
import { handleErrors } from "@/utils";
//

async function fetchHomePageData() {
  return await sanityFetch({
    query: queryHomePageData,
  });
}

// Blog Index Additions
async function fetchBlogPosts() {
  return await handleErrors(sanityFetch({ query: queryBlogIndexPageData }));
}

async function BlogIndexPage() {
  const [res, err] = await fetchBlogPosts();
  if (err || !res?.data) notFound();

  const {
    blogs = [],
    title,
    description,
    pageBuilder = [],
    _id,
    _type,
    displayFeaturedBlogs,
    featuredBlogsCount,
  } = res.data;

  const validFeaturedBlogsCount = featuredBlogsCount
    ? Number.parseInt(featuredBlogsCount)
    : 0;

  if (!blogs.length) {
    return (
      <main className="container my-16 mx-auto px-4 md:px-6">
        <BlogHeader title={title} description={description} />
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No blog posts available at the moment.
          </p>
        </div>
        {pageBuilder && pageBuilder.length > 0 && (
          <PageBuilder pageBuilder={pageBuilder} id={_id} type={_type} />
        )}
      </main>
    );
  }

  const shouldDisplayFeaturedBlogs =
    displayFeaturedBlogs && validFeaturedBlogsCount > 0;

  const featuredBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(0, validFeaturedBlogsCount)
    : [];
  const remainingBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(validFeaturedBlogsCount)
    : blogs;

  return (
    <main className="bg-background">
      {pageBuilder && pageBuilder.length > 0 && (
       <PageBuilder pageBuilder={pageBuilder} id={_id} type={_type} />
      )}
      <div className="container my-16 mx-auto px-4 md:px-6">
        <BlogHeader title={title} description={description} />

        {featuredBlogs.length > 0 && (
          <div className="mx-auto mt-8 sm:mt-12 md:mt-16 mb-12 lg:mb-20 grid grid-cols-1 gap-8 md:gap-12">
            {featuredBlogs.map((blog) => (
              <FeaturedBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {remainingBlogs.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 mt-8">
            {remainingBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      
    </main>
  );
}

//

export async function generateMetadata() {
  const homePageData = await fetchHomePageData();
  return await getMetaData(homePageData?.data ?? {});
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData) {
    return <div>No home page data</div>;
  }

  const { _id, _type, pageBuilder } = homePageData ?? {};

  return (
    <div>
      {/* <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />; */}
      <BlogIndexPage />
    </div>
  );
}