import startDb from '@/lib/db'
import BlogModel from '@/models/blogModel'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

let dummyText= `Colour RelationshipsColor relationships refer to the way colors interact with each other in a design. These relationships can create a sense of harmony, contrast, and balance in a design. There are several commonly used color relationships in design, each with its own unique visual effect.
Complementary colors are colors that are opposite each other on the color wheel, such as red and green, blue and orange, and yellow and purple. When used together, these colors create a high level of contrast and visual interest. This combination is often used to create a sense of drama and tension in a design.
Analogous colors are colors that are next to each other on the color wheel, such as red, orange, and yellow or blue, green, and purple. These colors are often used together to create a sense of harmony and continuity in a design. This combination is often used to create a sense of calm and soothing visual.
Monochromatic colors are variations of a single color, such as different shades and tints of blue. This combination is often used to create a sense of unity and cohesiveness in a design. Monochromatic colors are a great option for designs where a single color is desired to be the focus.
Triadic colors are a combination of three colors that are evenly spaced around the color wheel, such as red, yellow and blue, or purple, orange and green. This combination creates a balance between warm and cool colors and creates a sense of vibrancy and interest in a design.
Split-complementary colors are a combination of a color and the two colors adjacent to its complement on the color wheel, such as blue and orange-red and yellow-green. This combination creates a balance of color and creates a sense of visual interest without the tension of a complementary combination.
In addition to these commonly used color relationships, designers can also experiment with other color combinations such as double complementary, tetradic, square color and many more. These color relationships can be used to create a wide range of effects, from bold and striking to soft and subtle. It's important to keep in mind that color relationships are not an exact science, and designers should experiment with different combinations to find what works best for their design.
In conclusion, color relationships are an important aspect of color theory that designers should master in order to create cohesive and visually pleasing designs. By understanding and using these relationships effectively, designers can create a wide range of visual effects that enhance the overall aesthetic and readability of a design.


There are many variations in color that designers can make when experimenting with color in their design practice. Some of these variations include:
Hue: The name of the color, such as red, blue, or yellow.
Saturation: The intensity of a color, from pure and vivid to grayed-down or muted.
Brightness: The lightness or darkness of a color.
Temperature: The warm or cool feeling of a color, with warm colors being associated with reds, yellows and oranges and cool colors being associated with blues, greens, and purples.
Combining colors: Designers can experiment with different combinations of colors to create harmony, contrast, and visual interest.
Colour spaces and colour modes are two important concepts in color theory that are commonly used in design.
A color space is a mathematical model that describes how colors can be represented and reproduced. The most widely used color spaces are RGB (red, green, blue) and CMYK (cyan, magenta, yellow, and black). RGB is used for digital displays and electronic devices, while CMYK is used for printing. RGB color space uses red, green, and blue as its primary colors, and it creates a wide range of colors by mixing these three colors in different combinations and intensities. In contrast, CMYK color space uses cyan, magenta, yellow, and black as its primary colors and it is used to produce a full range of colors by using different combinations and intensities of these four colors.
A colour mode is a way of organizing and working with color in a digital image. The two most common color modes are RGB and CMYK. RGB color mode is best for images that will be displayed on a screen, such as images for websites or digital presentations. CMYK color mode is best for images that will be printed, such as images for brochures or business cards.
Another important concept in color theory is the color wheel. It is a visual representation of the color spectrum arranged in a circle, where primary, secondary and tertiary colors are placed. The primary colors are red, blue, and yellow, and they are the colors that cannot be created by mixing other colors. The secondary colors, which are green, orange and purple, are created by mixing the primary colors. Tertiary colors are created by mixing primary and secondary colors.
Another concept is the use of color temperature, which refers to the perceived warmth or coolness of a color. Color temperature is measured in Kelvins (K) and ranges from warm colors, such as reds and oranges, to cool colors, such as blues and greens. Warm colors are associated with feelings of warmth and comfort, while cool colors are associated with feelings of calm and tranquility.
Another important concept is color harmony, which refers to the way colors are used together in a design. There are several different types of color harmony, such as complementary, analogous, and monochromatic. Complementary colors are colors that are opposite each other on the color wheel, such as red and green. Analogous colors are colors that are next to each other on the color wheel, such as red, orange and yellow. Monochromatic colors are variations of a single color, such as different shades and tints of blue. Each type of color harmony creates a different visual effect, and designers can use these principles to create cohesive and visually pleasing designs.
In addition, there are also different color models like HSL (hue, saturation and lightness), HSV (hue, saturation and value) and many more. Each color model has its own way of representing colors, and each has its own strengths and weaknesses. Understanding these models and the concepts behind them is essential for the use of color in design.
In conclusion, color theory and its concepts, including color spaces, color modes, the color wheel, color temperature, color harmony, and color models, are essential for designers to understand and master. By understanding and using these concepts effectively, designers can create cohesive and visually pleasing designs that effectively convey their intended message.

`



const fetchBlogs = async () => {

   
  await startDb();
  const blogs = await BlogModel.find({ status:'published'}).sort('-createdAt').limit(1);
  // console.log(blog)
  // console.log('blogs from content', blogs)

  if (!blogs) return redirect("/404");
  // console.log(blogs)

  return blogs.map((blog) => {
      return {
          id: blog._id.toString(),
          title:blog.title,
          description:blog.description,
          thumbnail: blog.thumbnail?.url,
          category: blog.category,
          body: blog.body,
          author:blog.author,
          status:blog.status,
      };
  });
}




export default async function Content() {
  //  const article = await fetchBlogs();

  //  let wordCount = article[0].body.split(" ").length

  //  let timeToRead = Math.ceil(wordCount/200)

  //  console.log('article form content', article)

  return (
    <Flex className={`basePadding`} direction='row' gap='40px'>
        {/* <Flex width='35%' direction='column' >
            <Flex position='sticky' top='0' direction='column' gap='10px' >
              <Box width='85%' borderRadius='12px' overflow='hidden'>
                <Image src={article[0].thumbnail || ''} alt='scenic image' width='450' height='300' />
              </Box>
              
              <Heading>{article[0].title}</Heading>
              <Text>by {article[0].author}</Text>
              <Text> {timeToRead} min read</Text>
            </Flex>

        </Flex>
        <Flex width='65%'>
          <Text>{article[0].body}</Text>  
        </Flex> */}

    </Flex>
  )
}
