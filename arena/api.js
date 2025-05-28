const channelSlug = "meera-sunil-portfolio-workspace";
const accessToken = "ZwsQIyFeN_pIEBGVISuvzVeD_jn-l2qKZo-e8nFBFH8";

let allBlocks = [];
let renderedCount = 0;
const blocksPerLoad = 100;

async function fetchAllBlocks(page = 1, accumulatedBlocks = []) {
    const perPage = 100;
    const url = `https://api.are.na/v2/channels/${channelSlug}/contents?per=${perPage}&page=${page}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const data = await response.json();
        const newBlocks = accumulatedBlocks.concat(data.contents);

        if (data.contents.length === perPage) {
            return fetchAllBlocks(page + 1, newBlocks);
        } else {
            return newBlocks;
        }
    } catch (error) {
        console.error("Error fetching blocks:", error);
        return accumulatedBlocks;
    }
}

function renderBlocks(blocks, start, end) {
    const container = document.getElementById("portfolio");
    const subset = blocks.slice(start, end);

    subset.forEach(block => {
        const blockElement = document.createElement("div");
        blockElement.classList.add("block");

        if (block.class === "Image") {
            const imageUrl = block.image.original.url;
            blockElement.innerHTML = `<img src="${imageUrl}" alt="Image Block" />`;
        } else if (block.class === "Text") {
            blockElement.innerHTML = `<p>${block.content}</p>`;
        } else if (block.class === "Link") {
            blockElement.innerHTML = `<a href="${block.source.url}" target="_blank">${block.source.url}</a>`;
        } else if (block.class === "Media") {
            if (block.image?.original?.url) {
                blockElement.innerHTML = `<video controls src="${block.image.original.url}"></video>`;
            } else {
                blockElement.innerHTML = `<p>Unsupported media type</p>`;
            }
        } else {
            blockElement.innerHTML = `<p>Unsupported block type: ${block.class}</p>`;
        }

        container.appendChild(blockElement);
    });

    renderedCount += subset.length;

    // Show "Load More" if there's more to show
    const loadMoreBtn = document.getElementById("load-more");
    if (renderedCount < blocks.length) {
        loadMoreBtn.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

document.getElementById("load-more").addEventListener("click", () => {
    renderBlocks(allBlocks, renderedCount, renderedCount + blocksPerLoad);
});

fetchAllBlocks().then(blocks => {
    // Sort by created_at descending (newest first)
    allBlocks = blocks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    renderBlocks(allBlocks, 0, blocksPerLoad);
});
