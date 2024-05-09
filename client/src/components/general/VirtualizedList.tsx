import { useCallback, useEffect, useRef, useState } from "react";
import styles from './VirtualizedList.module.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ListItem } from "../../models/ListItem";

type Props = {
    items: ListItem[],
    itemHeight: number
}

export function VirtualizedList(props: Props) {  
  const { items, itemHeight } = props;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<ListItem[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  
  const container = useRef<HTMLDivElement>(null);
  
  const changeBackgroundColor = useCallback((id: number) => {
    setSelectedItem(id);
  }, []);

  const updateScroll = () => {
    if (container.current) {
      setScrollTop(container.current.scrollTop);
    }
  };
    
  useEffect(() => {
    if (container.current) {
      container.current.addEventListener('scroll', updateScroll);
      return () => container.current?.removeEventListener('scroll', updateScroll);
    }
  }, []);

  useEffect(() => {
    // Calculating items to render
    const containerHeight = container.current?.clientHeight || 0;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      items.length,
      startIndex + Math.ceil(containerHeight / itemHeight) + 1
    );

    setVisibleItems(items.slice(startIndex, endIndex));
  
  }, [items, scrollTop, itemHeight]);

  return (
    <div className={styles.container} ref={container}>
        <div style={{ height: `${items.length * itemHeight}px`, position: 'relative' }}>
        <TransitionGroup component={null}>
        {
          visibleItems.map((pr: ListItem, index) => (
              <CSSTransition
                  key={`transition_${pr.key}`}
                  classNames="item-transition"
                  timeout={20}
                  mountOnEnter
                  unmountOnExit
                  >
                  <div 
                      key={pr.key} 
                      onClick={() => changeBackgroundColor(pr.key)}
                      className={styles.item}
                      style={{ 
                              backgroundColor: selectedItem === pr.key ? '#ff000047' : 'transparent', 
                              position: 'sticky',
                              top: `${index * itemHeight}px` 
                            }}>
                      { pr.value }
                  </div>
              </CSSTransition>
          ))
        }
        </TransitionGroup>
        </div>
    </div>
  );
}