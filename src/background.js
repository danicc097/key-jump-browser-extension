const browserApi = typeof browser !== "undefined" ? browser : chrome;

browserApi.runtime.onMessage.addListener((request) => {
  const url = request?.openUrlInNewTab;
  if (typeof url !== "string") return;

  browserApi.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
    browserApi.storage.sync.get("activateNewTab", (options) => {
      browserApi.tabs.create({
        url,
        index: currentTab ? currentTab.index + 1 : undefined,
        active: options.activateNewTab,
      });
    });
  });
});
