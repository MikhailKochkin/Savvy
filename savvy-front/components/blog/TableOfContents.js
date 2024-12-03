import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  margin: 20px 0;
  font-size: 1.6rem;
  border-bottom: 1px solid #f0f1f1;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  .header {
    font-size: 1.5rem;
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 1.4;

    span {
      text-decoration: none;
      color: #000;
    }
  }
  .subheader {
    font-size: 1.4rem;
    margin-left: 20px;
  }
  .toc_header {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.6rem;
  }
`;

const TableOfContents = ({ text }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // Parse the text content to find headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3"));

    // Generate the TOC structure
    const tocItems = [];
    headings.forEach((heading) => {
      const id = heading.textContent.toLowerCase().replace(/\s+/g, "-"); // Create a simple ID
      heading.id = id; // Assign the ID to the heading (optional)
      if (heading.tagName === "H2") {
        tocItems.push({ id, text: heading.textContent, children: [] });
      } else if (heading.tagName === "H3" && tocItems.length > 0) {
        tocItems[tocItems.length - 1].children.push({
          id,
          text: heading.textContent,
        });
      }
    });

    setToc(tocItems);
  }, [text]);

  return (
    <Styles>
      <ul>
        {console.log(toc)}
        {toc.map((item) => (
          <li className="header" key={item.id}>
            <span href={`#${item.id}`}>{item.text}</span>
            {/* {item.children.length > 0 && (
              <ul>
                {item.children.map((child) => (
                  <li className="subheader" key={child.id}>
                    <a href={`#${child.id}`}>{child.text}</a>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </Styles>
  );
};

export default TableOfContents;
