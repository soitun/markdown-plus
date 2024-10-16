import { Button, Form, Input, Modal, Select } from 'antd';
import { autoRun } from 'manate';
import { auto } from 'manate/react';
import mdc from 'markdown-core/src/index-browser';
import React, { useEffect } from 'react';

import iconUrl from '../../icon.svg';
import { Store } from '../../store';

const themes = [
  '3024-day',
  '3024-night',
  'abcdef',
  'ambiance-mobile',
  'ambiance',
  'base16-dark',
  'base16-light',
  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  'default',
  'dracula',
  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  'hopscotch',
  'icecoder',
  'isotope',
  'lesser-dark',
  'liquibyte',
  'material',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'neat',
  'neo',
  'night',
  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  'railscasts',
  'rubyblue',
  'seti',
  'solarized',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  'yeti',
  'zenburn',
];

const PreferencesModal = auto((props: { store: Store }) => {
  console.log('render preferences modal');
  const { store } = props;
  const modal = store.modals.preferences;
  const preferences = store.preferences;
  useEffect(() => {
    const { start, stop } = autoRun(store, () => {
      if (!store.editor) {
        return;
      }
      mdc.mermaid.gantt.axisFormat(preferences.ganttAxisFormat);
    });
    start();
    return () => stop();
  }, []);
  return (
    <Modal
      open={modal.isOpen}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              modal.close();
            }}
          >
            Save
          </Button>
        </div>
      }
      onCancel={() => modal.close()}
      maskClosable={true}
      centered={true}
    >
      <div style={{ textAlign: 'center' }}>
        <p>
          <img src={iconUrl} width="64" />
        </p>
        <h2>Markdown Plus Preferences</h2>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} labelWrap>
          <Form.Item label="Show toolbar">
            <Select
              value={preferences.showToolbar}
              options={[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]}
              onChange={(value) => (preferences.showToolbar = value)}
            />
          </Form.Item>
          <Form.Item label="Editor vs. Preview">
            <Select
              value={preferences.editorVsPreview}
              options={[
                { value: '0fr 6px 1fr', label: '0 : 1' },
                { value: '1fr 6px 2fr', label: '1 : 2' },
                { value: '1fr 6px 1fr', label: '1 : 1' },
                { value: '2fr 6px 1fr', label: '2 : 1' },
                { value: '1fr 6px 0fr', label: '1 : 0' },
              ]}
              onChange={(value) => (preferences.editorVsPreview = value)}
            />
          </Form.Item>
          <Form.Item label="Editor theme">
            <Select
              value={preferences.editorTheme}
              options={themes.map((theme) => ({ value: theme, label: theme }))}
              onChange={(value) => (preferences.editorTheme = value)}
            />
          </Form.Item>
          <Form.Item label="Editor font size">
            <Select
              value={preferences.editorFontSize}
              options={[
                8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 24, 32, 48, 64,
              ].map((i) => ({ value: i, label: `${i}px` }))}
              onChange={(value) => (preferences.editorFontSize = value)}
            />
          </Form.Item>
          <Form.Item label="Key binding">
            <Select
              value={preferences.keyBinding}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'sublime', label: 'Sublime' },
                { value: 'vim', label: 'Vim' },
                { value: 'emacs', label: 'Emacs' },
              ]}
              onChange={(value) => (preferences.keyBinding = value)}
            />
          </Form.Item>
          <Form.Item
            label="Gantt diagram axis format"
            extra={
              <>
                <a
                  href="https://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Time formatting reference
                </a>
                <br />
                You need to restart the editor to apply this setting
              </>
            }
          >
            <Input
              placeholder="%Y-%m-%d"
              value={preferences.ganttAxisFormat}
              onChange={(e) => (preferences.ganttAxisFormat = e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
});

export default PreferencesModal;
