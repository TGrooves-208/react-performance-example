import { memo } from 'react'

// 1. We want to look at the change on the components when using useMemo
// 1. The first log wil demonstrate how this occurs for each typed character 
// 1. We can memoize the whole component to address the slowness
// 1. Memo will wrap the entire component, making this a high order component
// 1. We can leave this as an anonymous component if we would like
// 1. function MyButton(props)
export default memo(function (props) {
    console.log('Rendering MyButton')

    const startTime = new Date();
    // 1. Will cause an error for the component element node taking too long to render
    // 1. We are separating the dropdown input from the input accordingly
    while(new Date() - startTime < 1000){}

    return <button {...props} style={{color: 'purple'}} />;
    // 1. add areEqual dependency to try out ({}, areEqual);
});

// 1. We aren't guaranteeing it will never re-rendering
// 1. This is used as a perfomance boost
// function areEqual(prevProps, newProps) {
//     return true;
// }