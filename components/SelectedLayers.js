import { TextContent as TextContent2 } from '@adojs/core';
import React from 'react';

export const SelectedLayers = (data, type) => {
  switch (data.type.resolvedName) {
    case 'TextLayer':
      if (
        data?.props.text.includes(`data-list-type="ordered"`) ||
        data?.props.text.includes(`data-list-type=""`)
      ) {
        let pTagArray = data?.props.text.split('</p>');
        pTagArray = pTagArray.filter((data) => data !== '');
        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,

              ...(type === 'ROOT'
                ? { position: 'relative' }
                : {
                    position: 'absolute',
                    transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                  }),
              caretColor: 'transparent',
            }}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data?.props.scale}px`,
                width: `${data?.props.boxSize.width / data?.props.scale}px`,
                position: 'absolute',
                caretColor: 'transparent',

                transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                fontSize: `${data?.props.fontSizes[0]}px`,
                fontFamily: `${data?.props.fonts[0].name}`,
                transformOrigin: '0 0',
                ...(data?.props?.effect?.name === 'hollow'
                  ? {
                      'caret-color': `${data.props.colors[0]}`,
                      '-webkit-text-fill-color': 'transparent',
                      '-webkit-text-stroke': `${
                        0.0199985 * data?.props?.effect?.settings.thickness
                      }px ${data.props.colors[0]}`,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'shadow'
                  ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        data?.props?.effect?.settings.transparency / 100
                      )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'lift'
                  ? {
                      textShadow: `rgba(0,0,0,${
                        0.055 * data?.props?.effect?.settings.intensity
                      }) ${0}px ${2.1}px  ${
                        2.1 + data?.props?.effect?.settings.intensity * 0.065
                      }px`,
                      filter: 'opacity(1)',
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'echo'
                  ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        0.5
                      )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'splice'
                  ? {
                      'caret-color': `${data.props.colors[0]}`,
                      '-webkit-text-fill-color': 'transparent',
                      '-webkit-text-stroke': `${
                        0.0199985 * data?.props?.effect?.settings.thickness
                      }px ${data.props.colors[0]}`,
                      textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                    }
                  : {}),
              }}
            >
              {data?.props.text.includes(`data-list-type="ordered"`) ? (
                <ol className='PList oList'>
                  {pTagArray.map((data) => {
                    return ReactHtmlParser(data);
                  })}
                </ol>
              ) : (
                <ul className='PList'>
                  {pTagArray.map((data) => {
                    return ReactHtmlParser(data);
                  })}
                </ul>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              ...(type === 'ROOT'
                ? { position: 'relative' }
                : {
                    position: 'absolute',
                    transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                  }),
              caretColor: 'transparent',
            }}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data?.props.scale}px`,
                width: `${data?.props.boxSize.width / data?.props.scale}px`,
                position: 'absolute',
                transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                fontSize: `${data?.props.fontSizes[0]}px`,
                fontFamily: `${data?.props.fonts[0].name}`,

                transformOrigin: '0 0',
                ...(data?.props?.effect?.name === 'hollow'
                  ? {
                      '-webkit-text-fill-color': 'transparent',
                      '-webkit-text-stroke': `${
                        0.0199985 * data?.props?.effect?.settings.thickness
                      }px ${data.props.colors[0]}`,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'shadow'
                  ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        data?.props?.effect?.settings.transparency / 100
                      )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'lift'
                  ? {
                      textShadow: `rgba(0,0,0,${
                        0.055 * data?.props?.effect?.settings.intensity
                      }) ${0}px ${2.1}px  ${
                        2.1 + data?.props?.effect?.settings.intensity * 0.065
                      }px`,
                      filter: 'opacity(1)',
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'echo'
                  ? {
                      textShadow: `${convertRGBToRGBA(
                        data?.props?.effect?.settings.color,
                        0.5
                      )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                    }
                  : {}),
                ...(data?.props?.effect?.name === 'splice'
                  ? {
                      'caret-color': `${data.props.colors[0]}`,
                      '-webkit-text-fill-color': 'transparent',
                      '-webkit-text-stroke': `${
                        0.0199985 * data?.props?.effect?.settings.thickness
                      }px ${data.props.colors[0]}`,
                      textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                    }
                  : {}),
              }}
            >
              <TextContent2
                text={data?.props?.text}
                colors={data?.props?.colors}
                fontSizes={data?.props?.fontSizes}
                effect={data?.props?.effect}
              ></TextContent2>
            </div>
          </div>
        );
      }

    default:
      break;
  }
};
function convertRGBToRGBA(rgbColorString, alpha) {
  const rgbValues = rgbColorString.match(/\d+/g);

  if (!rgbValues || rgbValues.length !== 3) {
    return null;
  }

  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);

  alpha = Math.min(1, Math.max(0, alpha));

  const rgbaColorString = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return rgbaColorString;
}
function setTextShadow(
  direction,
  offset,
  offsteTime,
  isDirection,
  translateScale,
  fontSize
) {
  const mappedOffset = ((0.083 * fontSize) / 50) * offset * offsteTime;

  const angleInRadians = -(direction - 90) * (Math.PI / 180);
  switch (isDirection) {
    case 'x':
      return mappedOffset * Math.cos(angleInRadians);

    case 'y':
      return mappedOffset * Math.sin(angleInRadians);
  }
}
