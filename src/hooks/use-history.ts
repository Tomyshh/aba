"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { addHistoryItem, loadHistory, removeHistoryItem, saveHistory, updateHistoryStatus } from "@/lib/history";
import type { HistoryItem, JobStatus } from "@/lib/types";

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const add = useCallback((item: HistoryItem) => {
    const next = addHistoryItem(item);
    setItems(next);
    return next;
  }, []);

  const remove = useCallback((jobId: string) => {
    const next = removeHistoryItem(jobId);
    setItems(next);
    return next;
  }, []);

  const updateStatus = useCallback((jobId: string, status: JobStatus) => {
    const next = updateHistoryStatus(jobId, status);
    setItems(next);
    return next;
  }, []);

  const clear = useCallback(() => {
    saveHistory([]);
    setItems([]);
  }, []);

  return useMemo(
    () => ({
      items,
      add,
      remove,
      updateStatus,
      clear,
    }),
    [add, clear, items, remove, updateStatus],
  );
}


