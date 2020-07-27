FROM angrykoala/wendigo
 
# Example directory to run you app

COPY ./features /easy-click/features
COPY ./package.json /easy-click
COPY ./spec /easy-click/spec
COPY ./.eslintrc.js /easy-click
COPY ./report.js /easy-click
RUN mkdir /easy-click/reports

VOLUME /easy-click/reports

WORKDIR /easy-click
# Installs your up (it must have Wendigo as a dependency)
RUN npm install

RUN ls /lib/x86_64-linux-gnu

EXPOSE 8084
# Runs your tests
CMD ["npm", "run", "test"]