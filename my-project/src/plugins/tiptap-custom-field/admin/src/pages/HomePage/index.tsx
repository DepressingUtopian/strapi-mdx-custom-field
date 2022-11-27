/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";
import Tiptap from "../../components/Tiptap/Tiptap";
import pluginId from "../../pluginId";

const HomePage: React.VoidFunctionComponent = () => {
  const [monaco, setMonaco] = useState<any>();
  const [editor, setEditor] = useState<any>();


  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <Tiptap />
    </div>
  );
};

export default HomePage;
